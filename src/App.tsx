import { useState } from 'react';
import styled from 'styled-components';
import { CountdownTimer } from './components/CountdownTimer';
import { ValueDisplay } from './components/ValueDisplay';
import { LivePrices } from './components/LivePrices';
import { usePrices } from './hooks/usePrices';
import DbrLogo from './assets/dbr-animation.svg';
import { CurrencyToggle } from './components/CurrencyToggle';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
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

const Attribution = styled.a`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
  z-index: 99;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  img {
    height: 16px;
    width: auto;
    opacity: 0.5;
    transition: opacity 0.2s ease;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

function AppContent() {
  const { prices, loading, refetch } = usePrices();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <AppContainer>
      <CurrencyToggle />
      <Logo src={DbrLogo} alt="DBR Token" />
      <Title>DBR Airdrop Tracker</Title>
      <Subtitle>Second Distribution Countdown</Subtitle>
      <CountdownTimer />
      <ValueDisplay 
        prices={prices} 
        loading={loading} 
        onRefresh={handleRefresh} 
      />
      <LivePrices 
        prices={prices} 
        loading={loading} 
        isRefreshing={isRefreshing} 
      />
      <Attribution 
        href="https://www.coingecko.com/en/api" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Powered by CoinGecko API"
      >
        <img 
          src="https://static.coingecko.com/s/coingecko-branding-guide-8447de673439420efa0ab1e0e03a1f8b0137270fbc9c0b7c086ee284bd417fa1.png" 
          alt="CoinGecko" 
        />
        Powered by CoinGecko
      </Attribution>
    </AppContainer>
  );
}

export default function App() {
  return <AppContent />;
}

