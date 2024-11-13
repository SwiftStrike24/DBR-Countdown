import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { PriceData } from '../types';

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  z-index: 100;
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const PriceRow = styled.div<{ $isRefreshing?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  ${props => props.$isRefreshing && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -10px;
      right: -10px;
      bottom: 0;
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

const TokenSymbol = styled.span`
  color: #FBFF3A;
  font-weight: 500;
`;

const PriceValue = styled.span`
  color: #fff;
`;

interface LivePricesProps {
  prices: PriceData;
  loading: boolean;
  isRefreshing?: boolean;
}

export const LivePrices: React.FC<LivePricesProps> = ({ 
  prices, 
  loading,
  isRefreshing = false 
}) => {
  const solPrice = prices?.['solana']?.['usd'] || 0;
  const dbrPrice = prices?.['debridge']?.['usd'] || 0;

  if (loading) {
    return (
      <Container>
        <PriceRow>Loading prices...</PriceRow>
      </Container>
    );
  }

  return (
    <Container>
      <PriceRow $isRefreshing={isRefreshing}>
        <TokenSymbol>1 SOL</TokenSymbol> = <PriceValue>${solPrice.toFixed(2)}</PriceValue>
      </PriceRow>
      <PriceRow $isRefreshing={isRefreshing}>
        <TokenSymbol>1 DBR</TokenSymbol> = <PriceValue>${dbrPrice.toFixed(6)}</PriceValue>
      </PriceRow>
    </Container>
  );
}; 