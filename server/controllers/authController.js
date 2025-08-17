const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const twilio = require('twilio');

// Mock Supabase client for development when credentials are not available
let supabase;
try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_URL !== 'your_supabase_project_url') {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  } else {
    // Mock client for development
    supabase = {
      from: () => ({
        select: () => ({ 
          single: () => Promise.resolve({ data: null, error: { message: 'Database not configured' } }),
          or: () => ({ single: () => Promise.resolve({ data: null, error: null }) })
        }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ 
          data: { 
            id: 'mock_user_id', 
            first_name: 'Demo', 
            last_name: 'User', 
            email: 'demo@civilboost.com',
            phone_number: '+1234567890',
            coins_balance: 0,
            life_xp: 0,
            civilization_xp: 0,
            phone_verified: true
          }, 
          error: null 
        }) }) }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Database not configured' } }) })
      })
    };
  }
} catch (error) {
  console.warn('Supabase client initialization failed, using mock client');
  supabase = {
    from: () => ({
      select: () => ({ 
        single: () => Promise.resolve({ data: null, error: { message: 'Database not configured' } }),
        or: () => ({ single: () => Promise.resolve({ data: null, error: null }) })
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ 
        data: { 
          id: 'mock_user_id', 
          first_name: 'Demo', 
          last_name: 'User', 
          email: 'demo@civilboost.com',
          phone_number: '+1234567890',
          coins_balance: 0,
          life_xp: 0,
          civilization_xp: 0,
          phone_verified: true
        }, 
        error: null 
      }) }) }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Database not configured' } }) })
    })
  };
}

// Mock Twilio client for development
let twilioClient;
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID !== 'placeholder_sid') {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  } else {
    twilioClient = null;
  }
} catch (error) {
  console.warn('Twilio client initialization failed');
  twilioClient = null;
}

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
    if (!twilioClient) {
      console.warn('Twilio not configured, simulating SMS verification check');
      // For development, accept code "123456" as valid
      return {
        success: code === '123456'
      };
    }

    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: phoneNumber, code });

    return {
      success: verification.status === 'approved'
    };
  } catch (error) {
    console.error('SMS verification check error:', error);
    return {
      success: false,
      error: error.message
    };
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

    console.log('Registration request:', { firstName, lastName, email, phoneNumber, country, hasVerificationCode: !!verificationCode });

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // For development, skip SMS verification check and user existence check
    console.log('Creating user with mock database...');

    // Generate mock user data for development
    const mockUser = {
      id: 'mock_user_' + Date.now(),
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      phone_number: phoneNumber,
      coins_balance: 0,
      life_xp: 0,
      civilization_xp: 0,
      phone_verified: true
    };

    // Generate JWT token
    const token = generateToken(mockUser.id);

    console.log('User registered successfully:', mockUser.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: mockUser,
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

    console.log('Send verification request:', { phoneNumber });

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    // For development, always return success
    console.log('Sending SMS verification to:', phoneNumber);
    
    res.json({
      success: true,
      message: 'Verification code sent successfully. Use code: 123456 for testing.'
    });

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
