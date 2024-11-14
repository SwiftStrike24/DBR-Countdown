import React from 'react';
import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { PriceData } from '../types';
import { AIRDROP_AMOUNT } from '../config/constants';
import { useCurrency } from '../context/CurrencyContext';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.07);
  padding: 1.25rem;
  border-radius: 1.5rem;
  margin: 1rem 0;
  position: relative;
  width: 92%;
  max-width: 560px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease;
  animation: floatAnimation 6s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(251, 255, 58, 0.1);
    border-color: rgba(251, 255, 58, 0.2);
  }
  
  @media (min-width: 768px) {
    padding: 2.5rem;
    margin: 2.5rem 0;
    min-width: 420px;
    width: auto;
  }

  @keyframes floatAnimation {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.5rem;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(251, 255, 58, 0.03),
      transparent
    );
    z-index: -1;
  }
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  margin: 0.75rem 0;
  color: #fff;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    gap: 1.25rem;
    margin: 1rem 0;
    flex-wrap: nowrap;
  }
`;

const TokenInfo = styled.div<{ $isRefreshing?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  min-width: fit-content;
  position: relative;
  font-size: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(251, 255, 58, 0.1);
  }
  
  @media (min-width: 768px) {
    gap: 1rem;
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  ${props => props.$isRefreshing && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 1rem;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(251, 255, 58, 0.1),
        transparent
      );
      background-size: 1000px 100%;
      animation: ${shimmer} 1s linear infinite;
    }
  `}
`;

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const ToggleButton = styled.button`
  background: rgba(251, 255, 58, 0.1);
  border: 1px solid rgba(251, 255, 58, 0.2);
  color: #FBFF3A;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(251, 255, 58, 0.15);
    border-color: rgba(251, 255, 58, 0.3);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    margin-top: 2.5rem;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const RefreshButton = styled.button<{ $isLoading?: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: ${props => props.$isLoading ? '#3a3a3a' : '#2a2a2a'};
  border: none;
  color: #fff;
  padding: 0.5rem;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #FBFF3A;
    opacity: ${props => props.$isLoading ? 1 : 0};
    animation: ${pulse} 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  
  svg {
    transform-origin: center;
    animation: ${rotate} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation-play-state: ${props => props.$isLoading ? 'running' : 'paused'};
    opacity: ${props => props.$isLoading ? 0.7 : 1};
    transition: opacity 0.3s;
  }

  &:hover {
    background: #333;
    transform: ${props => props.$isLoading ? 'none' : 'scale(1.1)'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Equals = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

interface ValueDisplayProps {
  prices: PriceData;
  loading: boolean;
  onRefresh: () => Promise<void>;
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({ prices, loading, onRefresh }) => {
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('USDC');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { currency: fiatCurrency } = useCurrency();
  const currencySymbol = fiatCurrency === 'USD' ? '$' : 'C$';

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      onRefresh(),
      new Promise(resolve => setTimeout(resolve, 800))
    ]);
    setIsRefreshing(false);
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USDC' ? 'SOL' : 'USDC');
  };

  if (loading) return <div>Loading prices...</div>;

  const dbrPrice = prices?.['debridge']?.['usd'] || 0;
  const solPrice = prices?.['solana']?.['usd'] || 0;
  const dbrLogo = prices?.['debridge']?.['image'];
  const solLogo = prices?.['solana']?.['image'];
  const totalValueUSD = AIRDROP_AMOUNT * dbrPrice;
  const totalValueSOL = totalValueUSD / solPrice;

  return (
    <Container>
      <Value>
        <TokenInfo $isRefreshing={isRefreshing}>
          {dbrLogo && <TokenIcon src={dbrLogo} alt="DBR" />}
          {AIRDROP_AMOUNT.toFixed(2)} DBR
        </TokenInfo>
        <Equals>=</Equals>
        <TokenInfo $isRefreshing={isRefreshing}>
          {currency === 'USDC' 
            ? `${currencySymbol}${totalValueUSD.toFixed(2)}`
            : (
              <>
                {solLogo && <TokenIcon src={solLogo} alt="SOL" />}
                {`${totalValueSOL.toFixed(2)} SOL`}
              </>
            )}
        </TokenInfo>
      </Value>
      <ButtonContainer>
        <ToggleButton onClick={toggleCurrency}>
          Show in {currency === 'USDC' ? 'SOL' : 'USDC'}
        </ToggleButton>
      </ButtonContainer>
      <RefreshButton 
        onClick={handleRefresh} 
        disabled={isRefreshing}
        $isLoading={isRefreshing}
        title="Refresh prices"
        aria-label="Refresh prices"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.666 2.334A7.956 7.956 0 0 0 8 0C3.582 0 0 3.582 0 8s3.582 8 8 8c3.866 0 7.078-2.746 7.809-6.4h-2.155A5.987 5.987 0 0 1 8 14c-3.309 0-6-2.691-6-6s2.691-6 6-6c1.555 0 2.961.6 4.027 1.573L9.414 6H16V0l-2.334 2.334z" fill="currentColor"/>
        </svg>
      </RefreshButton>
    </Container>
  );
};
