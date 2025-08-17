import React, { useState } from 'react';
import styled from 'styled-components';
import { neonColors } from '../../theme/colors';
import { FuturisticButton } from '../../components/UI/FuturisticButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${neonColors.deepSpace}, ${neonColors.charcoalBlack});
`;

const RegisterCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid ${neonColors.electricPink}40;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${neonColors.cyberLime};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 0 0 20px ${neonColors.cyberLime}60;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${neonColors.holographicBlue}40;
  border-radius: 10px;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: ${neonColors.electricPink};
    box-shadow: 0 0 15px ${neonColors.electricPink}40;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Select = styled.select`
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
  
  option {
    background: ${neonColors.charcoalBlack};
    color: white;
  }
`;

const VerificationSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const VerifyButton = styled.button`
  background: linear-gradient(135deg, ${neonColors.holographicBlue}, ${neonColors.electricTeal});
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px ${neonColors.holographicBlue}40;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.p`
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

const countries = [
  'Nigeria', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'South Africa', 'Kenya', 'Ghana', 'India', 'Germany', 'France',
  'Brazil', 'Mexico', 'Japan', 'China', 'Other'
];

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    verificationCode: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendVerification = async () => {
    if (!formData.phoneNumber) {
      toast.error('Please enter your phone number first');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
      });

      const data = await response.json();

      if (data.success) {
        setVerificationSent(true);
        toast.success('Verification code sent to your phone!');
      } else {
        toast.error(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.password || !formData.phoneNumber || !formData.country) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Account created successfully!');
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Join CivilBoost</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
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
          </InputGroup>
          
          <Input 
            type="email" 
            name="email"
            placeholder="Email Address *" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <Input 
            type="password" 
            name="password"
            placeholder="Password (min 6 characters) *" 
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength="6"
          />
          
          <VerificationSection>
            <Input 
              type="tel" 
              name="phoneNumber"
              placeholder="Phone Number (with country code) *" 
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <VerifyButton 
              type="button" 
              onClick={sendVerification}
              disabled={isVerifying || !formData.phoneNumber}
            >
              {isVerifying ? 'Sending...' : verificationSent ? 'Resend' : 'Verify'}
            </VerifyButton>
          </VerificationSection>
          
          {verificationSent && (
            <Input 
              type="text" 
              name="verificationCode"
              placeholder="Enter verification code" 
              value={formData.verificationCode}
              onChange={handleInputChange}
              maxLength="6"
            />
          )}
          
          <InputGroup>
            <Input 
              type="date" 
              name="dateOfBirth"
              placeholder="Date of Birth" 
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
            <Select 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Country *</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Select>
          </InputGroup>
          
          <FuturisticButton 
            type="submit" 
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? '🚀 Creating Account...' : '🚀 Create Account'}
          </FuturisticButton>
        </Form>
        
        <LoginLink>
          Already have an account? <a href="/login">Sign In</a>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
}
