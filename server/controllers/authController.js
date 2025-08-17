const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Send SMS verification
const sendSMSVerification = async (phoneNumber) => {
  try {
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });
    
    return { success: true, sid: verification.sid };
  } catch (error) {
    console.error('SMS verification error:', error);
    return { success: false, error: error.message };
  }
};

// Verify SMS code
const verifySMSCode = async (phoneNumber, code) => {
  try {
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: phoneNumber, code });
    
    return { success: verification.status === 'approved' };
  } catch (error) {
    console.error('SMS verification check error:', error);
    return { success: false, error: error.message };
  }
};

// Register user
const register = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phoneNumber, 
      dateOfBirth, 
      country,
      verificationCode 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Verify SMS code if provided
    if (verificationCode) {
      const smsVerification = await verifySMSCode(phoneNumber, verificationCode);
      if (!smsVerification.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid verification code'
        });
      }
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},phone_number.eq.${phoneNumber}`)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone number already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in Supabase
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(),
          password_hash: hashedPassword,
          phone_number: phoneNumber,
          date_of_birth: dateOfBirth,
          country,
          phone_verified: !!verificationCode,
          coins_balance: 0,
          life_xp: 0,
          civilization_xp: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select('id, first_name, last_name, email, phone_number, coins_balance, life_xp, civilization_xp, phone_verified')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create user account'
      });
    }

    // Generate JWT token
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: newUser,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Send verification SMS
const sendVerification = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    const result = await sendSMSVerification(phoneNumber);

    if (result.success) {
      res.json({
        success: true,
        message: 'Verification code sent successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || 'Failed to send verification code'
      });
    }

  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, password_hash, phone_number, coins_balance, life_xp, civilization_xp, phone_verified')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, phone_number, date_of_birth, country, coins_balance, life_xp, civilization_xp, phone_verified, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Forgot password functionality
const forgotPassword = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, first name, and last name'
      });
    }

    // Find user with matching details
    const { data: user, error } = await supabase
      .from('users')
      .select('id, phone_number, first_name, last_name')
      .eq('email', email.toLowerCase())
      .eq('first_name', firstName)
      .eq('last_name', lastName)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with the provided information'
      });
    }

    // Send SMS verification to user's phone
    const smsResult = await sendSMSVerification(user.phone_number);
    
    if (smsResult.success) {
      // Mask phone number for security
      const maskedPhone = user.phone_number.substring(0, 3) + 
                         '*'.repeat(user.phone_number.length - 7) + 
                         user.phone_number.substring(user.phone_number.length - 4);

      res.json({
        success: true,
        message: 'Verification code sent to your registered phone number',
        maskedPhone
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to send verification code'
      });
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Verify reset code
const verifyResetCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required'
      });
    }

    // Get user's phone number
    const { data: user, error } = await supabase
      .from('users')
      .select('phone_number')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify SMS code
    const verification = await verifySMSCode(user.phone_number, verificationCode);

    if (verification.success) {
      res.json({
        success: true,
        message: 'Verification code is valid'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

  } catch (error) {
    console.error('Verify reset code error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, verificationCode } = req.body;

    if (!email || !newPassword || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email, new password, and verification code are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, phone_number')
      .eq('email', email.toLowerCase())
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify SMS code one more time
    const verification = await verifySMSCode(user.phone_number, verificationCode);

    if (!verification.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in database
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Password update error:', updateError);
      return res.status(500).json({
        success: false,
        message: 'Failed to update password'
      });
    }

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  register,
  login,
  sendVerification,
  getProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword
};
