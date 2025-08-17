import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SportsArena } from '../components/SportsBackground/SportsArena';
import { FuturisticButton } from '../components/UI/FuturisticButton';
import { CoinDisplay } from '../components/CoinSystem/CoinDisplay';
import { neonColors } from '../theme/colors';

const heroGlow = keyframes`
  0%, 100% { text-shadow: 0 0 20px ${neonColors.electricPink}80; }
  50% { text-shadow: 0 0 40px ${neonColors.cyberLime}80; }
`;

const floatUp = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1;
`;

const HeroSection = styled.div`
  text-align: center;
  max-width: 800px;
  animation: ${floatUp} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(45deg, ${neonColors.electricPink}, ${neonColors.cyberLime}, ${neonColors.holographicBlue});
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${heroGlow} 3s ease-in-out infinite;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${neonColors.electricTeal};
  text-shadow: 0 0 10px ${neonColors.electricTeal}40;
  margin-bottom: 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
  width: 100%;
  max-width: 1200px;
`;

const FeatureCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${neonColors.plasmaPurple}40;
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  animation: ${floatUp} 1s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-10px);
    border-color: ${neonColors.plasmaPurple}80;
    box-shadow: 0 20px 40px rgba(157, 0, 255, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${neonColors.goldenYellow};
  text-shadow: 0 0 10px ${neonColors.goldenYellow}60;
  margin-bottom: 15px;
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: ${neonColors.electricTeal};
  line-height: 1.6;
  text-align: center;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatsSection = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Home() {
  return (
    <>
      <SportsArena />
      <HomeContainer>
        <HeroSection>
          <HeroTitle>CivilBoost</HeroTitle>
          <HeroSubtitle>
            Turn everyday actions into real-world progress. 
            Earn coins, learn skills, and create positive change globally.
          </HeroSubtitle>
          
          <ActionSection>
            <FuturisticButton size="large">
              🚀 Start Earning
            </FuturisticButton>
            <FuturisticButton variant="secondary">
              📚 Browse Courses
            </FuturisticButton>
          </ActionSection>
          
          <StatsSection>
            <CoinDisplay amount={1250} label="Your Coins" />
            <CoinDisplay amount={89} label="Life XP" />
            <CoinDisplay amount={156} label="Civilization XP" />
          </StatsSection>
        </HeroSection>

        <FeatureGrid>
          <FeatureCard delay="0.2s">
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Earn While You Learn</FeatureTitle>
            <FeatureDescription>
              Watch ads, complete challenges, teach courses, and share knowledge. 
              Every action earns you coins instantly.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard delay="0.4s">
            <FeatureIcon>🎓</FeatureIcon>
            <FeatureTitle>Knowledge Exchange</FeatureTitle>
            <FeatureDescription>
              Create and sell your own courses or learn from experts worldwide. 
              Turn your skills into income.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard delay="0.6s">
            <FeatureIcon>🏦</FeatureIcon>
            <FeatureTitle>Global Withdrawals</FeatureTitle>
            <FeatureDescription>
              Convert coins to local currency and withdraw directly to your bank account, 
              anywhere in the world.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard delay="0.8s">
            <FeatureIcon>🌍</FeatureIcon>
            <FeatureTitle>Community Impact</FeatureTitle>
            <FeatureDescription>
              Fund real projects that improve communities globally. 
              Vote on initiatives and see your impact come to life.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard delay="1.0s">
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>Global Communities</FeatureTitle>
            <FeatureDescription>
              Connect with people worldwide through age, profession, and location-based 
              chat groups and forums.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard delay="1.2s">
            <FeatureIcon>🎮</FeatureIcon>
            <FeatureTitle>Gamified Growth</FeatureTitle>
            <FeatureDescription>
              Track your Life XP and Civilization XP. Compete on leaderboards 
              and unlock daily life tools.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </HomeContainer>
    </>
  );
}
