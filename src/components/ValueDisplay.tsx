import { useState } from 'react';
import styled from 'styled-components';
import { usePrices } from '../hooks/usePrices';
import { AIRDROP_AMOUNT } from '../config/constants';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  margin: 2rem 0;
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

export const ValueDisplay = () => {
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('USDC');
  const { prices, loading } = usePrices();

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USDC' ? 'SOL' : 'USDC');
  };

  if (loading) return <div>Loading prices...</div>;

  const dbrPrice = prices?.debridge?.usd || 0;
  const solPrice = prices?.solana?.usd || 0;
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
      <ToggleButton onClick={toggleCurrency}>
        Show in {currency === 'USDC' ? 'SOL' : 'USDC'}
      </ToggleButton>
    </Container>
  );
};
