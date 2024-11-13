import React from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PriceData } from '../types';
import { AIRDROP_AMOUNT } from '../config/constants';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  margin: 2rem 0;
  position: relative;
`;

const Value = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
  color: #fff;
`;

const ToggleButton = styled.button`
  background: #444;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #555;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
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

interface ValueDisplayProps {
  prices: PriceData;
  loading: boolean;
  onRefresh: () => Promise<void>;
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({ prices, loading, onRefresh }) => {
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('USDC');
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  const totalValueUSD = AIRDROP_AMOUNT * dbrPrice;
  const totalValueSOL = totalValueUSD / solPrice;

  return (
    <Container>
      <Value>
        {AIRDROP_AMOUNT.toFixed(2)} DBR
        {' = '}
        {currency === 'USDC' 
          ? `$${totalValueUSD.toFixed(2)}`
          : `${totalValueSOL.toFixed(2)} SOL`}
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
