import React, { useState } from 'react';
import styled from 'styled-components';
import { neonColors } from '../../theme/colors';
import { FuturisticButton } from '../../components/UI/FuturisticButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPasswordContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${neonColors.deepSpace}, ${neonColors.charcoalBlack});
`;

const ForgotPasswordCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid ${neonColors.electricPink}40;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  max-width: 450px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${neonColors.cyberLime};
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  text-shadow: 0 0 20px ${neonColors.cyberLime}60;
`;

const Subtitle = styled.p`
  color: ${neonColors.neonWhite};
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0.8;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${neonColors.holographicBlue}40;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${neonColors.electricPink};
    box-shadow: 0 0 15px ${neonColors.electricPink}40;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? neonColors.electricPink : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  font-weight: 600;
  border: 2px solid ${props => props.active ? neonColors.electricPink : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
`;

const PhoneDisplay = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid ${neonColors.cyberLime}30;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${neonColors.cyberLime};
  
  .masked-phone {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

const BackLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: ${neonColors.neonWhite};
  
  a {
    color: ${neonColors.electricPink};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-shadow: 0 0 10px ${neonColors.electricPink}60;
    }
  }
`;

const maskPhoneNumber = (phone) => {
  if (!phone || phone.length < 4) return phone;
  const countryCode = phone.substring(0, 3);
  const lastFour = phone.substring(phone.length - 4);
  const masked = '*'.repeat(phone.length - 7);
  return `${countryCode}${masked}${lastFour}`;
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email/name, 2: verification, 3: new password
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const healthCheck = await fetch('http://localhost:5000/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!healthCheck.ok) {
        throw new Error('Backend server is not running');
      }

      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUserPhone(data.maskedPhone);
        setStep(2);
        toast.success('Verification code sent to your registered phone number!');
      } else {
        toast.error(data.message || 'User not found or information does not match');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      if (error.message.includes('Backend server')) {
        toast.error('Backend server is not running. Please start the server first.');
      } else if (error.message.includes('Failed to fetch')) {
        toast.error('Cannot connect to server. Please check if the backend is running on port 5000.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    
    if (!formData.verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          verificationCode: formData.verificationCode
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setStep(3);
        toast.success('Code verified! Now set your new password.');
      } else {
        toast.error(data.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    
    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
          verificationCode: formData.verificationCode
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset successfully! You can now login with your new password.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <Form onSubmit={handleStep1Submit}>
      <Input 
        type="email" 
        name="email"
        placeholder="Email Address *" 
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <Input 
        type="text" 
        name="firstName"
        placeholder="First Name *" 
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <Input 
        type="text" 
        name="lastName"
        placeholder="Last Name *" 
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
      
      <FuturisticButton 
        type="submit" 
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? '🔍 Verifying...' : '🔍 Find Account'}
      </FuturisticButton>
    </Form>
  );

  const renderStep2 = () => (
    <Form onSubmit={handleStep2Submit}>
      <PhoneDisplay>
        <p>Verification code sent to:</p>
        <div className="masked-phone">{maskPhoneNumber(userPhone)}</div>
      </PhoneDisplay>
      
      <Input 
        type="text" 
        name="verificationCode"
        placeholder="Enter 6-digit verification code" 
        value={formData.verificationCode}
        onChange={handleInputChange}
        maxLength="6"
        required
      />
      
      <FuturisticButton 
        type="submit" 
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? '✅ Verifying...' : '✅ Verify Code'}
      </FuturisticButton>
    </Form>
  );

  const renderStep3 = () => (
    <Form onSubmit={handleStep3Submit}>
      <Input 
        type="password" 
        name="newPassword"
        placeholder="New Password (min 6 characters) *" 
        value={formData.newPassword}
        onChange={handleInputChange}
        minLength="6"
        required
      />
      <Input 
        type="password" 
        name="confirmPassword"
        placeholder="Confirm New Password *" 
        value={formData.confirmPassword}
        onChange={handleInputChange}
        minLength="6"
        required
      />
      
      <FuturisticButton 
        type="submit" 
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? '🔒 Updating...' : '🔒 Reset Password'}
      </FuturisticButton>
    </Form>
  );

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard>
        <Title>Reset Password</Title>
        <Subtitle>
          {step === 1 && "Enter your account details to verify your identity"}
          {step === 2 && "Enter the verification code sent to your phone"}
          {step === 3 && "Create a new secure password"}
        </Subtitle>
        
        <StepIndicator>
          <Step active={step >= 1}>1</Step>
          <Step active={step >= 2}>2</Step>
          <Step active={step >= 3}>3</Step>
        </StepIndicator>
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        
        <BackLink>
          Remember your password? <a href="/login">Sign In</a>
        </BackLink>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
}
