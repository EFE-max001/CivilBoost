// CivilBoost Futuristic Color System
export const neonColors = {
  // Primary explosive colors
  electricPink: '#FF0080',
  cyberLime: '#00FF41', 
  holographicBlue: '#00D4FF',
  plasmaPurple: '#9D00FF',
  
  // Secondary vibrant colors
  goldenYellow: '#FFD700',
  sunsetOrange: '#FF4500',
  electricTeal: '#00FFFF',
  magenta: '#FF00FF',
  
  // Background gradients
  deepSpace: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 25%, #000066 50%, #330066 75%, #0a0a0a 100%)',
  cosmicPurple: 'linear-gradient(45deg, #2D1B69 0%, #11998e 100%)',
  neonGlow: 'linear-gradient(90deg, #FF0080 0%, #00FF41 25%, #00D4FF 50%, #9D00FF 75%, #FF0080 100%)',
  
  // Sport-specific color themes
  sports: {
    boxing: {
      primary: '#FF0000',
      secondary: '#FFD700',
      accent: '#FFFFFF'
    },
    football: {
      primary: '#228B22',
      secondary: '#FFFFFF', 
      accent: '#8B4513'
    },
    volleyball: {
      primary: '#F4A460',
      secondary: '#00CED1',
      accent: '#FFFFFF'
    },
    soccer: {
      primary: '#228B22',
      secondary: '#FFFFFF',
      accent: '#000000'
    },
    basketball: {
      primary: '#FF8C00',
      secondary: '#8B4513',
      accent: '#FFFFFF'
    },
    tennis: {
      primary: '#228B22',
      secondary: '#FFFFFF',
      accent: '#FFD700'
    },
    swimming: {
      primary: '#00CED1',
      secondary: '#0000FF',
      accent: '#FFFFFF'
    },
    running: {
      primary: '#DC143C',
      secondary: '#FFD700',
      accent: '#FFFFFF'
    }
  }
};

export const animatedGradients = {
  flowing: `
    background: linear-gradient(-45deg, ${neonColors.electricPink}, ${neonColors.cyberLime}, ${neonColors.holographicBlue}, ${neonColors.plasmaPurple});
    background-size: 400% 400%;
    animation: gradientFlow 4s ease infinite;
  `,
  pulsing: `
    background: radial-gradient(circle, ${neonColors.electricPink}40 0%, ${neonColors.plasmaPurple}20 100%);
    animation: pulse 2s ease-in-out infinite alternate;
  `,
  rainbow: `
    background: linear-gradient(90deg, 
      ${neonColors.electricPink} 0%, 
      ${neonColors.sunsetOrange} 14%, 
      ${neonColors.goldenYellow} 28%, 
      ${neonColors.cyberLime} 42%, 
      ${neonColors.electricTeal} 57%, 
      ${neonColors.holographicBlue} 71%, 
      ${neonColors.plasmaPurple} 85%, 
      ${neonColors.magenta} 100%
    );
    background-size: 200% 100%;
    animation: rainbowShift 3s linear infinite;
  `
};
