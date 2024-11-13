import React from 'react';
import styled from 'styled-components';
import { CountdownTimer } from './components/CountdownTimer';
import { ValueDisplay } from './components/ValueDisplay';
import { LivePrices } from './components/LivePrices';
import { usePrices } from './hooks/usePrices';
import DbrLogo from './assets/dbr-animation.svg';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 2rem;
  text-align: center;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
`;

function App() {
  const { prices, loading, refetch } = usePrices();

  return (
    <AppContainer>
      <Logo src={DbrLogo} alt="deBridge Logo" />
      <Title>deBridge Foundation</Title>
      <Subtitle>Second Distribution Countdown</Subtitle>
      <CountdownTimer />
      <ValueDisplay prices={prices} loading={loading} onRefresh={refetch} />
      <LivePrices prices={prices} loading={loading} />
    </AppContainer>
  );
}

export default App;
