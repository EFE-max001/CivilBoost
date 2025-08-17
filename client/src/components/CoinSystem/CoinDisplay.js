import React from 'react';
import styled, { keyframes } from 'styled-components';
import { neonColors } from '../../theme/colors';

const coinSpin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const coinGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px ${neonColors.goldenYellow}80,
                0 0 40px ${neonColors.goldenYellow}60,
                0 0 60px ${neonColors.goldenYellow}40;
  }
  50% { 
    box-shadow: 0 0 30px ${neonColors.sunsetOrange}80,
                0 0 60px ${neonColors.sunsetOrange}60,
                0 0 90px ${neonColors.sunsetOrange}40;
  }
`;

const numberTick = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const CoinContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  border: 2px solid ${neonColors.goldenYellow}60;
  backdrop-filter: blur(10px);
`;

const CoinIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${neonColors.goldenYellow}, ${neonColors.sunsetOrange});
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000;
  animation: ${coinSpin} 4s linear infinite, ${coinGlow} 2s ease-in-out infinite;
  position: relative;
  
  &::before {
    content: '₵';
    font-size: 24px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const CoinAmount = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${neonColors.goldenYellow};
  text-shadow: 0 0 10px ${neonColors.goldenYellow}60;
  animation: ${props => props.animate ? numberTick : 'none'} 0.3s ease;
`;

const CoinLabel = styled.span`
  font-size: 14px;
  color: ${neonColors.electricTeal};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const CoinDisplay = ({ amount = 0, label = "Coins", animate = false }) => {
  return (
    <CoinContainer>
      <CoinIcon />
      <div>
        <CoinAmount animate={animate}>
          {amount.toLocaleString()}
        </CoinAmount>
        <CoinLabel>{label}</CoinLabel>
      </div>
    </CoinContainer>
  );
};
