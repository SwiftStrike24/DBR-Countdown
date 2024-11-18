import { useState } from 'react';
import styled from 'styled-components';
import { CountdownTimer } from './components/CountdownTimer';
import { ValueDisplay } from './components/ValueDisplay';
import { LivePrices } from './components/LivePrices';
import { PriceChart } from './components/PriceChart';
import { usePrices } from './hooks/usePrices';
import DbrLogo from './assets/dbr-animation.svg';
import { CurrencyToggle } from './components/CurrencyToggle';
import { AirdropProvider } from './context/AirdropContext';

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  background: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 4rem;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 2rem;
    padding-top: 4rem;
    overflow-y: auto;
  }
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  color: #888;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 5rem);
  max-height: 800px;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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
      <ContentWrapper>
        <MainContent>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Logo src={DbrLogo} alt="DBR Token" />
            <Title>DBR Airdrop Tracker</Title>
            <Subtitle>Second Distribution Countdown</Subtitle>
          </div>
          <CountdownTimer />
          <AirdropProvider>
            <PriceSection>
              <PriceChart />
              <div style={{ flex: 1, width: '100%' }}>
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
              </div>
            </PriceSection>
          </AirdropProvider>
        </MainContent>
      </ContentWrapper>
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
