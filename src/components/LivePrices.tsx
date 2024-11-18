import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { PriceData } from '../types';
import { useCurrency } from '../context/CurrencyContext';

const Container = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.85rem;
  z-index: 100;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 500px;
    font-size: 0.8rem;
    padding: 0.6rem 0.85rem;
  }

  @media (max-width: 768px) {
    width: 92%;
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
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
  justify-content: center;
  gap: 0.5rem;
  position: relative;

  @media (min-width: 768px) {
    justify-content: flex-start;
    gap: 0.75rem;
  }

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

const TokenIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 24px;
    height: 24px;
  }
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
  const { currency } = useCurrency();
  const currencySymbol = currency === 'USD' ? '$' : 'C$';

  const solPrice = prices?.['solana']?.['usd'] || 0;
  const dbrPrice = prices?.['debridge']?.['usd'] || 0;
  const solLogo = prices?.['solana']?.['image'];
  const dbrLogo = prices?.['debridge']?.['image']

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
        {solLogo && <TokenIcon src={solLogo} alt="SOL" />}
        <TokenSymbol>1 SOL</TokenSymbol> = <PriceValue>{currencySymbol}{solPrice.toFixed(2)}</PriceValue>
      </PriceRow>
      <PriceRow $isRefreshing={isRefreshing}>
        {dbrLogo && <TokenIcon src={dbrLogo} alt="DBR" />}
        <TokenSymbol>1 DBR</TokenSymbol> = <PriceValue>{currencySymbol}{dbrPrice.toFixed(6)}</PriceValue>
      </PriceRow>
    </Container>
  );
}; 