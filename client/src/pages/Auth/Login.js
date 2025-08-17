import React from 'react';
import styled from 'styled-components';
import { FuturisticButton } from '../../components/UI/FuturisticButton';
import { neonColors } from '../../theme/colors';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginForm = styled.form`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${neonColors.electricPink}40;
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(15px);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${neonColors.electricPink};
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 10px ${neonColors.electricPink}60;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${neonColors.cyberLime}40;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${neonColors.cyberLime};
    box-shadow: 0 0 10px ${neonColors.cyberLime}40;
  }
`;

export default function Login() {
  return (
    <LoginContainer>
      <LoginForm>
        <Title>Login to CivilBoost</Title>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <FuturisticButton style={{ width: '100%', marginBottom: '20px' }}>
          Login
        </FuturisticButton>
        <FuturisticButton variant="secondary" style={{ width: '100%' }}>
          Don't have an account? Register
        </FuturisticButton>
      </LoginForm>
    </LoginContainer>
  );
}
