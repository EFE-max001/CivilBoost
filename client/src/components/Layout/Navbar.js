import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FuturisticButton } from '../UI/FuturisticButton';
import { CoinDisplay } from '../CoinSystem/CoinDisplay';
import { neonColors } from '../../theme/colors';

const navGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px ${neonColors.electricPink}30; }
  50% { box-shadow: 0 0 40px ${neonColors.cyberLime}30; }
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px 30px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${neonColors.electricPink}40;
  animation: ${navGlow} 4s ease-in-out infinite;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, ${neonColors.electricPink}, ${neonColors.cyberLime});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px ${neonColors.electricPink}60;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavRight = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export default function Navbar() {
  return (
    <NavContainer>
      <NavContent>
        <Logo>CivilBoost</Logo>
        
        <NavLinks>
          <FuturisticButton>Dashboard</FuturisticButton>
          <FuturisticButton>Courses</FuturisticButton>
          <FuturisticButton>Community</FuturisticButton>
        </NavLinks>
        
        <NavRight>
          <CoinDisplay amount={1250} label="Coins" />
          <FuturisticButton>Profile</FuturisticButton>
        </NavRight>
      </NavContent>
    </NavContainer>
  );
}
