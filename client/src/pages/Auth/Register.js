import React from 'react';
import styled from 'styled-components';
import { FuturisticButton } from '../../components/UI/FuturisticButton';
import { neonColors } from '../../theme/colors';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const RegisterForm = styled.form`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${neonColors.holographicBlue}40;
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(15px);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${neonColors.holographicBlue};
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 0 10px ${neonColors.holographicBlue}60;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${neonColors.plasmaPurple}40;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${neonColors.plasmaPurple};
    box-shadow: 0 0 10px ${neonColors.plasmaPurple}40;
  }
`;

export default function Register() {
  return (
    <RegisterContainer>
      <RegisterForm>
        <Title>Join CivilBoost</Title>
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
        <Input type="email" placeholder="Email" />
        <Input type="tel" placeholder="Phone Number" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <FuturisticButton style={{ width: '100%', marginBottom: '20px' }}>
          Create Account
        </FuturisticButton>
        <FuturisticButton variant="secondary" style={{ width: '100%' }}>
          Already have an account? Login
        </FuturisticButton>
      </RegisterForm>
    </RegisterContainer>
  );
}
