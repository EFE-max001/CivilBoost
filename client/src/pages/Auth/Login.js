import React, { useState } from 'react';
import styled from 'styled-components';
import { neonColors } from '../../theme/colors';
import { FuturisticButton } from '../../components/UI/FuturisticButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${neonColors.deepSpace}, ${neonColors.charcoalBlack});
`;

const LoginCard = styled.div`
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

const ForgotPassword = styled.a`
  color: ${neonColors.electricTeal};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: right;
  margin-top: -0.5rem;
  
  &:hover {
    text-shadow: 0 0 10px ${neonColors.electricTeal}60;
  }
`;

const RegisterLink = styled.p`
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

const DemoCredentials = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid ${neonColors.cyberLime}30;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: ${neonColors.cyberLime};
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${neonColors.cyberLime};
  }
  
  p {
    margin: 0.25rem 0;
    opacity: 0.9;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if backend server is running first
      const healthCheck = await fetch('http://localhost:5000/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!healthCheck.ok) {
        throw new Error('Backend server is not running');
      }

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Welcome back to CivilBoost!');
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
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

  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@civilboost.com',
      password: 'demo123'
    });
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to continue your impact journey</Subtitle>
        
        <DemoCredentials>
          <h4>🚀 Quick Demo Access</h4>
          <p>Email: demo@civilboost.com</p>
          <p>Password: demo123</p>
          <button 
            type="button" 
            onClick={fillDemoCredentials}
            style={{
              background: 'none',
              border: `1px solid ${neonColors.cyberLime}60`,
              color: neonColors.cyberLime,
              padding: '0.3rem 0.8rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            Fill Demo Credentials
          </button>
        </DemoCredentials>
        
        <Form onSubmit={handleSubmit}>
          <Input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <ForgotPassword href="/forgot-password">Forgot Password?</ForgotPassword>
          
          <FuturisticButton 
            type="submit" 
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? '🔑 Signing In...' : '🔑 Sign In'}
          </FuturisticButton>
        </Form>
        
        <RegisterLink>
          Don't have an account? <a href="/register">Join CivilBoost</a>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
}
