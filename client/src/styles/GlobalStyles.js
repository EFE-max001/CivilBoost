import { createGlobalStyle, keyframes } from 'styled-components';
import { neonColors } from '../theme/colors';

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const rainbowShift = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: ${neonColors.deepSpace};
    color: white;
    overflow-x: hidden;
    cursor: none; /* Custom cursor will be added */
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, ${neonColors.electricPink}, ${neonColors.cyberLime});
    border-radius: 10px;
    box-shadow: 0 0 10px ${neonColors.electricPink}60;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, ${neonColors.cyberLime}, ${neonColors.holographicBlue});
  }

  /* Global animation classes */
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes rainbowShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  /* Touch ripple effect */
  .touch-ripple {
    position: fixed;
    border-radius: 50%;
    background: radial-gradient(circle, ${neonColors.electricPink}40 0%, transparent 70%);
    pointer-events: none;
    animation: ${rippleEffect} 0.6s ease-out;
    z-index: 9999;
  }

  /* Custom cursor */
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: ${neonColors.cyberLime};
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 0 20px ${neonColors.cyberLime}80;
    transition: transform 0.1s ease;
  }

  .custom-cursor.hover {
    transform: scale(1.5);
    background: ${neonColors.electricPink};
    box-shadow: 0 0 30px ${neonColors.electricPink}80;
  }

  /* Utility classes */
  .neon-text {
    text-shadow: 0 0 10px currentColor;
  }

  .glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .floating {
    animation: ${keyframes`
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    `} 3s ease-in-out infinite;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Selection styling */
  ::selection {
    background: ${neonColors.electricPink}40;
    color: white;
  }

  ::-moz-selection {
    background: ${neonColors.electricPink}40;
    color: white;
  }
`;
