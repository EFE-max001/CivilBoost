import React from 'react';
import styled from 'styled-components';
import { neonColors } from '../theme/colors';
import { SportsArena } from '../components/SportsBackground/SportsArena';
import { FuturisticButton } from '../components/UI/FuturisticButton';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1;
`;

const HeroSection = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  background: linear-gradient(135deg, ${neonColors.electricPink}, ${neonColors.cyberLime}, ${neonColors.holographicBlue});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-shadow: 0 0 50px ${neonColors.electricPink}40;
  animation: titleGlow 3s ease-in-out infinite alternate;
  
  @keyframes titleGlow {
    0% { filter: brightness(1) saturate(1); }
    100% { filter: brightness(1.2) saturate(1.3); }
  }
`;

const Tagline = styled.h2`
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: ${neonColors.electricTeal};
  margin-bottom: 2rem;
  font-weight: 300;
  text-shadow: 0 0 20px ${neonColors.electricTeal}60;
  animation: fadeInUp 1s ease-out 0.5s both;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ValueProposition = styled.p`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: ${neonColors.neonWhite};
  max-width: 800px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
  text-shadow: 0 0 10px ${neonColors.neonWhite}30;
  animation: fadeInUp 1s ease-out 0.8s both;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 1.1s both;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${neonColors.darkGray}40, ${neonColors.charcoalBlack}60);
  border: 1px solid ${neonColors.electricPink}30;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px ${neonColors.electricPink}20;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px ${neonColors.electricPink}40;
    border-color: ${neonColors.cyberLime}60;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${neonColors.cyberLime};
  text-shadow: 0 0 15px ${neonColors.cyberLime}60;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${neonColors.neonWhite};
  opacity: 0.8;
`;

const CTASection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 3rem 0;
  animation: fadeInUp 1s ease-out 1.4s both;
`;

const FeatureHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 4rem auto 0;
  animation: fadeInUp 1s ease-out 1.7s both;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, ${neonColors.darkGray}20, ${neonColors.charcoalBlack}40);
  border: 1px solid ${neonColors.holographicBlue}30;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    border-color: ${neonColors.electricPink}60;
    box-shadow: 0 10px 30px ${neonColors.holographicBlue}30;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: ${neonColors.cyberLime};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px ${neonColors.cyberLime}40;
`;

const FeatureText = styled.p`
  color: ${neonColors.neonWhite};
  opacity: 0.9;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <SportsArena />
      <LandingContainer>
        <HeroSection>
          <MainTitle>CivilBoost</MainTitle>
          <Tagline>Turn Your Time Into Money & Global Impact</Tagline>
          
          <ValueProposition>
            The world's first platform where you earn real money while creating positive change. 
            Watch ads, learn skills, teach others, and fund community projects worldwide - 
            all while building your personal growth and making a lasting difference.
          </ValueProposition>

          <StatsContainer>
            <StatCard>
              <StatNumber>$2.4M+</StatNumber>
              <StatLabel>Earned by Users</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>156</StatNumber>
              <StatLabel>Projects Funded</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>89</StatNumber>
              <StatLabel>Countries</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>12K+</StatNumber>
              <StatLabel>Active Members</StatLabel>
            </StatCard>
          </StatsContainer>

          <CTASection>
            <FuturisticButton 
              size="large" 
              onClick={() => navigate('/register')}
            >
              🚀 Start Earning Today
            </FuturisticButton>
            <FuturisticButton 
              variant="secondary" 
              onClick={() => navigate('/login')}
            >
              🔑 I Have an Account
            </FuturisticButton>
          </CTASection>

          <FeatureHighlights>
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Instant Payouts</FeatureTitle>
              <FeatureText>
                Earn money immediately. No waiting periods, no minimum thresholds. 
                Cash out anytime to your bank account.
              </FeatureText>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🌍</FeatureIcon>
              <FeatureTitle>Global Community</FeatureTitle>
              <FeatureText>
                Connect with people worldwide. Share knowledge, build relationships, 
                and create impact together.
              </FeatureText>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Real Impact</FeatureTitle>
              <FeatureText>
                Your activities fund real projects: clean water, education, 
                infrastructure. See the change you're making.
              </FeatureText>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📈</FeatureIcon>
              <FeatureTitle>Personal Growth</FeatureTitle>
              <FeatureText>
                Track your progress with Life XP and Civilization XP. 
                Unlock rewards as you grow and contribute.
              </FeatureText>
            </FeatureCard>
          </FeatureHighlights>
        </HeroSection>
      </LandingContainer>
    </>
  );
}
