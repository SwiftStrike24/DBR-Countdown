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
import { GitHubButton } from './components/GitHubButton';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
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
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 1rem;
  }
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
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0;
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

const LogoContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const ValueDisplayContainer = styled.div`
  flex: 1;
  width: 100%;
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
      <GitHubButton />
      <CurrencyToggle />
      <ContentWrapper>
        <MainContent>
          <LogoContainer>
            <Logo src={DbrLogo} alt="DBR Token" />
            <Title>DBR Airdrop Tracker</Title>
            <Subtitle>Second Distribution Countdown</Subtitle>
          </LogoContainer>
          <CountdownTimer />
          <AirdropProvider>
            <PriceSection>
              <PriceChart />
              <ValueDisplayContainer>
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
              </ValueDisplayContainer>
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
