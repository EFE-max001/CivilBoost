import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { neonColors } from '../../theme/colors';

// Sports arena cycling system
const SPORTS_CYCLE = [
  'boxing', 'football', 'volleyball', 'soccer', 
  'basketball', 'tennis', 'swimming', 'running'
];

const CYCLE_DURATION = 8000; // 8 seconds per sport for better visibility

// Keyframe animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px ${neonColors.electricPink}40; }
  50% { box-shadow: 0 0 40px ${neonColors.cyberLime}60; }
`;

const particleFloat = keyframes`
  0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; }
`;

const ArenaContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, ${neonColors.deepSpace}, ${neonColors.charcoalBlack});
  will-change: transform;
  transform: translateZ(0);
`;

const SportScene = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 2s ease-in-out;
  background: ${props => {
    const sport = neonColors.sports[props.sport];
    return `radial-gradient(ellipse at center, ${sport?.primary || neonColors.electricPink}20, transparent 70%)`;
  }};
  will-change: opacity;
  transform: translateZ(0);
`;

const Athlete = styled.div`
  position: absolute;
  width: 60px;
  height: 100px;
  background: ${neonColors.electricPink};
  border-radius: 30px 30px 10px 10px;
  animation: ${floatAnimation} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 15px;
    width: 30px;
    height: 30px;
    background: ${neonColors.goldenYellow};
    border-radius: 50%;
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 10px;
    width: 40px;
    height: 20px;
    background: ${neonColors.holographicBlue};
    border-radius: 20px;
  }
`;

const Equipment = styled.div`
  position: absolute;
  width: ${props => props.size || '30px'};
  height: ${props => props.size || '30px'};
  background: ${props => props.color || neonColors.electricTeal};
  border-radius: 50%;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  box-shadow: 0 0 20px ${props => props.color || neonColors.electricTeal};
`;

const ParticleEffect = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${neonColors.cyberLime};
  border-radius: 50%;
  animation: ${particleFloat} 8s linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  left: ${props => props.left || '50%'};
`;

const StadiumLights = styled.div`
  position: absolute;
  top: 10%;
  left: ${props => props.position || '20%'};
  width: 100px;
  height: 20px;
  background: linear-gradient(90deg, transparent 0%, ${neonColors.goldenYellow} 50%, transparent 100%);
  transform: rotate(${props => props.angle || '0deg'});
  animation: ${pulseGlow} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const BoxingRing = ({ active }) => (
  <SportScene active={active} sport="boxing">
    <Athlete style={{ left: '30%', top: '40%' }} delay="0s" />
    <Athlete style={{ left: '60%', top: '45%' }} delay="1s" />
    <StadiumLights position="20%" angle="45deg" delay="0s" />
    <StadiumLights position="80%" angle="-45deg" delay="1s" />
    {[...Array(10)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.8}s`} left={`${20 + i * 8}%`} />
    ))}
  </SportScene>
);

const FootballStadium = ({ active }) => (
  <SportScene active={active} sport="football">
    <Athlete style={{ left: '25%', top: '50%' }} delay="0s" />
    <Athlete style={{ left: '45%', top: '40%' }} delay="0.5s" />
    <Athlete style={{ left: '65%', top: '55%' }} delay="1s" />
    <Equipment 
      size="25px" 
      color={neonColors.sunsetOrange} 
      style={{ left: '50%', top: '30%' }} 
      delay="0.3s" 
    />
    <StadiumLights position="10%" angle="30deg" delay="0s" />
    <StadiumLights position="90%" angle="-30deg" delay="1.5s" />
    {[...Array(15)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.5}s`} left={`${10 + i * 6}%`} />
    ))}
  </SportScene>
);

const VolleyballCourt = ({ active }) => (
  <SportScene active={active} sport="volleyball">
    <Athlete style={{ left: '35%', top: '60%' }} delay="0s" />
    <Athlete style={{ left: '65%', top: '60%' }} delay="0.8s" />
    <Equipment 
      size="20px" 
      color={neonColors.electricTeal} 
      style={{ left: '50%', top: '20%' }} 
      delay="0.4s" 
    />
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '2px',
      height: '40%',
      background: neonColors.magenta,
      boxShadow: `0 0 10px ${neonColors.magenta}`
    }} />
    {[...Array(12)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.6}s`} left={`${15 + i * 7}%`} />
    ))}
  </SportScene>
);

const SoccerField = ({ active }) => (
  <SportScene active={active} sport="soccer">
    <Athlete style={{ left: '20%', top: '45%' }} delay="0s" />
    <Athlete style={{ left: '50%', top: '55%' }} delay="0.6s" />
    <Athlete style={{ left: '80%', top: '40%' }} delay="1.2s" />
    <Equipment 
      size="22px" 
      color={neonColors.electricPink} 
      style={{ left: '45%', top: '35%' }} 
      delay="0.2s" 
    />
    <StadiumLights position="15%" angle="20deg" delay="0s" />
    <StadiumLights position="85%" angle="-20deg" delay="2s" />
    {[...Array(18)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.4}s`} left={`${5 + i * 5}%`} />
    ))}
  </SportScene>
);

const BasketballCourt = ({ active }) => (
  <SportScene active={active} sport="basketball">
    <Athlete style={{ left: '30%', top: '50%' }} delay="0s" />
    <Athlete style={{ left: '70%', top: '45%' }} delay="0.7s" />
    <Equipment 
      size="24px" 
      color={neonColors.sunsetOrange} 
      style={{ left: '50%', top: '25%' }} 
      delay="0.3s" 
    />
    <div style={{
      position: 'absolute',
      left: '20%',
      top: '30%',
      width: '60px',
      height: '80px',
      border: `2px solid ${neonColors.goldenYellow}`,
      borderRadius: '5px',
      boxShadow: `0 0 15px ${neonColors.goldenYellow}60`
    }} />
    <StadiumLights position="25%" angle="15deg" delay="0.5s" />
    <StadiumLights position="75%" angle="-15deg" delay="1.5s" />
    {[...Array(12)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.7}s`} left={`${20 + i * 6}%`} />
    ))}
  </SportScene>
);

const TennisCourt = ({ active }) => (
  <SportScene active={active} sport="tennis">
    <Athlete style={{ left: '25%', top: '60%' }} delay="0s" />
    <Athlete style={{ left: '75%', top: '40%' }} delay="0.9s" />
    <Equipment 
      size="18px" 
      color={neonColors.cyberLime} 
      style={{ left: '50%', top: '30%' }} 
      delay="0.4s" 
    />
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '1px',
      height: '60%',
      background: neonColors.electricTeal,
      boxShadow: `0 0 8px ${neonColors.electricTeal}`
    }} />
    <StadiumLights position="30%" angle="25deg" delay="0s" />
    <StadiumLights position="70%" angle="-25deg" delay="1.8s" />
    {[...Array(8)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.9}s`} left={`${25 + i * 7}%`} />
    ))}
  </SportScene>
);

const SwimmingPool = ({ active }) => (
  <SportScene active={active} sport="swimming">
    <Athlete style={{ left: '15%', top: '50%' }} delay="0s" />
    <Athlete style={{ left: '45%', top: '45%' }} delay="0.5s" />
    <Athlete style={{ left: '75%', top: '55%' }} delay="1s" />
    <div style={{
      position: 'absolute',
      left: '10%',
      top: '40%',
      width: '80%',
      height: '20%',
      background: `linear-gradient(90deg, ${neonColors.electricTeal}20, ${neonColors.holographicBlue}40, ${neonColors.electricTeal}20)`,
      borderRadius: '10px',
      boxShadow: `0 0 20px ${neonColors.electricTeal}40`
    }} />
    <StadiumLights position="20%" angle="10deg" delay="0s" />
    <StadiumLights position="80%" angle="-10deg" delay="1.2s" />
    {[...Array(15)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.5}s`} left={`${10 + i * 5}%`} />
    ))}
  </SportScene>
);

const RunningTrack = ({ active }) => (
  <SportScene active={active} sport="running">
    <Athlete style={{ left: '10%', top: '50%' }} delay="0s" />
    <Athlete style={{ left: '30%', top: '45%' }} delay="0.3s" />
    <Athlete style={{ left: '50%', top: '55%' }} delay="0.6s" />
    <Athlete style={{ left: '70%', top: '50%' }} delay="0.9s" />
    <div style={{
      position: 'absolute',
      left: '5%',
      top: '45%',
      width: '90%',
      height: '10%',
      background: `linear-gradient(90deg, ${neonColors.plasmaPurple}30, ${neonColors.electricPink}50, ${neonColors.plasmaPurple}30)`,
      borderRadius: '50px',
      boxShadow: `0 0 15px ${neonColors.electricPink}40`
    }} />
    <StadiumLights position="10%" angle="5deg" delay="0s" />
    <StadiumLights position="90%" angle="-5deg" delay="2s" />
    {[...Array(20)].map((_, i) => (
      <ParticleEffect key={i} delay={`${i * 0.3}s`} left={`${5 + i * 4.5}%`} />
    ))}
  </SportScene>
);

export const SportsArena = () => {
  const [currentSport, setCurrentSport] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSport((prev) => (prev + 1) % SPORTS_CYCLE.length);
        setIsTransitioning(false);
      }, 500);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const renderSportScene = (sportIndex) => {
    const sport = SPORTS_CYCLE[sportIndex];
    const isActive = sportIndex === currentSport && !isTransitioning;
    
    switch (sport) {
      case 'boxing':
        return <BoxingRing key="boxing" active={isActive} />;
      case 'football':
        return <FootballStadium key="football" active={isActive} />;
      case 'volleyball':
        return <VolleyballCourt key="volleyball" active={isActive} />;
      case 'soccer':
        return <SoccerField key="soccer" active={isActive} />;
      case 'basketball':
        return <BasketballCourt key="basketball" active={isActive} />;
      case 'tennis':
        return <TennisCourt key="tennis" active={isActive} />;
      case 'swimming':
        return <SwimmingPool key="swimming" active={isActive} />;
      case 'running':
        return <RunningTrack key="running" active={isActive} />;
      default:
        return <BoxingRing key="default" active={isActive} />;
    }
  };

  return (
    <ArenaContainer>
      {SPORTS_CYCLE.map((_, index) => renderSportScene(index))}
    </ArenaContainer>
  );
};
