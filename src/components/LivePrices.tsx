import React from 'react';
import styled from 'styled-components';
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

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
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
}

export const LivePrices: React.FC<LivePricesProps> = ({ prices, loading }) => {
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
      <PriceRow>
        <TokenSymbol>1 SOL</TokenSymbol> = <PriceValue>${solPrice.toFixed(2)}</PriceValue>
      </PriceRow>
      <PriceRow>
        <TokenSymbol>1 DBR</TokenSymbol> = <PriceValue>${dbrPrice.toFixed(2)}</PriceValue>
      </PriceRow>
    </Container>
  );
}; 