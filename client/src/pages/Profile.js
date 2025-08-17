import React from 'react';
import styled from 'styled-components';
import { neonColors } from '../theme/colors';

const ProfileContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${neonColors.plasmaPurple};
  text-shadow: 0 0 20px ${neonColors.plasmaPurple}60;
  margin-bottom: 40px;
`;

export default function Profile() {
  return (
    <ProfileContainer>
      <Title>Profile</Title>
      <p style={{ color: neonColors.electricTeal }}>Coming soon...</p>
    </ProfileContainer>
  );
}
