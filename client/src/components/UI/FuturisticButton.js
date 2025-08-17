import React from 'react';
import styled, { keyframes } from 'styled-components';
import { neonColors } from '../../theme/colors';

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px ${neonColors.electricPink}60, 
                0 0 40px ${neonColors.electricPink}40, 
                0 0 60px ${neonColors.electricPink}20;
  }
  50% { 
    box-shadow: 0 0 30px ${neonColors.cyberLime}80, 
                0 0 60px ${neonColors.cyberLime}60, 
                0 0 90px ${neonColors.cyberLime}40;
  }
`;

const particleExplosion = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 1; }
  100% { transform: scale(3) rotate(180deg); opacity: 0; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const ButtonContainer = styled.button`
  position: relative;
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, ${neonColors.electricPink}, ${neonColors.holographicBlue});
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${glowPulse} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: scale(1.05);
    animation-duration: 1s;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  pointer-events: none;
  opacity: ${props => props.exploding ? 1 : 0};
  transition: opacity 0.1s;
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${neonColors.cyberLime};
  border-radius: 50%;
  animation: ${particleExplosion} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  transform-origin: center;
  
  &:nth-child(1) { transform: translate(-50%, -50%) rotate(0deg) translateX(20px); }
  &:nth-child(2) { transform: translate(-50%, -50%) rotate(45deg) translateX(20px); }
  &:nth-child(3) { transform: translate(-50%, -50%) rotate(90deg) translateX(20px); }
  &:nth-child(4) { transform: translate(-50%, -50%) rotate(135deg) translateX(20px); }
  &:nth-child(5) { transform: translate(-50%, -50%) rotate(180deg) translateX(20px); }
  &:nth-child(6) { transform: translate(-50%, -50%) rotate(225deg) translateX(20px); }
  &:nth-child(7) { transform: translate(-50%, -50%) rotate(270deg) translateX(20px); }
  &:nth-child(8) { transform: translate(-50%, -50%) rotate(315deg) translateX(20px); }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
  background: linear-gradient(
    90deg,
    ${neonColors.electricPink},
    ${neonColors.cyberLime},
    ${neonColors.holographicBlue},
    ${neonColors.plasmaPurple}
  );
  background-size: 400% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3s linear infinite;
`;

export const FuturisticButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  ...props 
}) => {
  const [isExploding, setIsExploding] = React.useState(false);

  const handleClick = (e) => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 600);
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <ButtonContainer onClick={handleClick} {...props}>
      <ButtonText>{children}</ButtonText>
      <ParticleContainer exploding={isExploding}>
        {[...Array(8)].map((_, i) => (
          <Particle key={i} delay={i * 0.05} />
        ))}
      </ParticleContainer>
    </ButtonContainer>
  );
};
