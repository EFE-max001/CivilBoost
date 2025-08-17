import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { neonColors } from '../theme/colors';
import { CoinDisplay } from '../components/CoinSystem/CoinDisplay';
import { FuturisticButton } from '../components/UI/FuturisticButton';
import { SportsArena } from '../components/SportsBackground/SportsArena';

const DashboardContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  color: ${neonColors.neonWhite};
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
`;

const WelcomeTitle = styled.h1`
  color: ${neonColors.cyberLime};
  text-shadow: 0 0 20px ${neonColors.cyberLime}60;
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
`;

const WelcomeSubtitle = styled.p`
  color: ${neonColors.electricTeal};
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
`;

const ActionCard = styled.div`
  background: linear-gradient(135deg, ${neonColors.darkGray}40, ${neonColors.charcoalBlack}60);
  border: 1px solid ${neonColors.electricPink}30;
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px ${neonColors.electricPink}20;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px ${neonColors.electricPink}40;
    border-color: ${neonColors.cyberLime}60;
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: ${neonColors.cyberLime};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px ${neonColors.cyberLime}40;
`;

const CardDescription = styled.p`
  color: ${neonColors.neonWhite};
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const RecentActivity = styled.div`
  background: linear-gradient(135deg, ${neonColors.darkGray}20, ${neonColors.charcoalBlack}40);
  border: 1px solid ${neonColors.holographicBlue}30;
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
`;

const ActivityTitle = styled.h2`
  color: ${neonColors.holographicBlue};
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px ${neonColors.holographicBlue}40;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${neonColors.electricPink}20;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityText = styled.span`
  color: ${neonColors.neonWhite};
  opacity: 0.9;
`;

const ActivityReward = styled.span`
  color: ${neonColors.cyberLime};
  font-weight: 600;
  text-shadow: 0 0 8px ${neonColors.cyberLime}40;
`;

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const userName = user ? `${user.first_name} ${user.last_name}` : 'CivilBooster';
  const userCoins = user?.coins_balance || 0;
  const userLifeXP = user?.life_xp || 0;
  const userCivXP = user?.civilization_xp || 0;

  return (
    <>
      <SportsArena />
      <DashboardContainer>
        <WelcomeSection>
          <WelcomeTitle>Welcome back, {userName}! 🚀</WelcomeTitle>
          <WelcomeSubtitle>
            Ready to make an impact and earn rewards today?
          </WelcomeSubtitle>
        </WelcomeSection>

        <StatsGrid>
          <CoinDisplay amount={userCoins} label="Your Coins" />
          <CoinDisplay amount={userLifeXP} label="Life XP" />
          <CoinDisplay amount={userCivXP} label="Civilization XP" />
          <CoinDisplay amount={42} label="Days Active" />
        </StatsGrid>

        <ActionGrid>
          <ActionCard>
            <CardIcon>📺</CardIcon>
            <CardTitle>Watch & Earn</CardTitle>
            <CardDescription>
              Watch sponsored content and earn coins instantly. 
              Each ad watched = 5-15 coins depending on length.
            </CardDescription>
            <FuturisticButton size="medium">
              Start Watching
            </FuturisticButton>
          </ActionCard>

          <ActionCard>
            <CardIcon>🎓</CardIcon>
            <CardTitle>Learn Skills</CardTitle>
            <CardDescription>
              Take courses from global experts. Earn certificates, 
              XP, and sometimes coins for completion.
            </CardDescription>
            <FuturisticButton size="medium" variant="secondary">
              Browse Courses
            </FuturisticButton>
          </ActionCard>

          <ActionCard>
            <CardIcon>🏆</CardIcon>
            <CardTitle>Daily Challenges</CardTitle>
            <CardDescription>
              Complete daily tasks to earn bonus rewards. 
              Streak bonuses available for consistent participation.
            </CardDescription>
            <FuturisticButton size="medium">
              View Challenges
            </FuturisticButton>
          </ActionCard>

          <ActionCard>
            <CardIcon>🌍</CardIcon>
            <CardTitle>Fund Projects</CardTitle>
            <CardDescription>
              Use your coins to support real community projects 
              worldwide and see the impact you're creating.
            </CardDescription>
            <FuturisticButton size="medium" variant="secondary">
              Explore Projects
            </FuturisticButton>
          </ActionCard>

          <ActionCard>
            <CardIcon>💰</CardIcon>
            <CardTitle>Withdraw Earnings</CardTitle>
            <CardDescription>
              Convert your coins to real money and withdraw 
              to your bank account or mobile money.
            </CardDescription>
            <FuturisticButton size="medium">
              Withdraw Now
            </FuturisticButton>
          </ActionCard>

          <ActionCard>
            <CardIcon>👥</CardIcon>
            <CardTitle>Join Communities</CardTitle>
            <CardDescription>
              Connect with like-minded people, share knowledge, 
              and participate in group challenges.
            </CardDescription>
            <FuturisticButton size="medium" variant="secondary">
              Find Communities
            </FuturisticButton>
          </ActionCard>
        </ActionGrid>

        <RecentActivity>
          <ActivityTitle>Recent Activity</ActivityTitle>
          <ActivityItem>
            <ActivityText>Completed "Introduction to Web Development" course</ActivityText>
            <ActivityReward>+50 coins, +25 XP</ActivityReward>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>Watched 5 sponsored videos</ActivityText>
            <ActivityReward>+45 coins</ActivityReward>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>Contributed to "Clean Water for Ghana" project</ActivityText>
            <ActivityReward>+15 Civilization XP</ActivityReward>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>Completed daily login challenge</ActivityText>
            <ActivityReward>+10 coins</ActivityReward>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>Joined "Young Entrepreneurs" community</ActivityText>
            <ActivityReward>+5 Life XP</ActivityReward>
          </ActivityItem>
        </RecentActivity>
      </DashboardContainer>
    </>
  );
}
