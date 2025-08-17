import React from 'react';
import styled from 'styled-components';
import { neonColors } from '../theme/colors';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${neonColors.electricPink};
  text-shadow: 0 0 20px ${neonColors.electricPink}60;
  margin-bottom: 40px;
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <p style={{ color: neonColors.electricTeal }}>Coming soon...</p>
    </DashboardContainer>
  );
}
