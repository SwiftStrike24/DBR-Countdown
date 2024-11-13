import React from 'react';
import styled from 'styled-components';
import { useCurrency } from '../context/CurrencyContext';
import { SupportedCurrency } from '../types';

const Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 100;
`;

const CurrencyButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${props => props.$active ? 'rgba(251, 255, 58, 0.1)' : 'rgba(0, 0, 0, 0.7)'};
  border: 1px solid ${props => props.$active ? '#FBFF3A' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#FBFF3A' : '#fff'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  font-weight: 500;
  min-width: 100px;
  justify-content: center;

  &:hover {
    background: rgba(251, 255, 58, 0.1);
    border-color: #FBFF3A;
  }
`;

const FlagImg = styled.img`
  width: 24px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Container>
      <CurrencyButton 
        onClick={() => setCurrency('USD')} 
        $active={currency === 'USD'}
      >
        <FlagImg 
          src="https://flagcdn.com/w40/us.png"
          srcSet="https://flagcdn.com/w80/us.png 2x"
          alt="USD" 
        />
        USD
      </CurrencyButton>
      <CurrencyButton 
        onClick={() => setCurrency('CAD')} 
        $active={currency === 'CAD'}
      >
        <FlagImg 
          src="https://flagcdn.com/w40/ca.png"
          srcSet="https://flagcdn.com/w80/ca.png 2x"
          alt="CAD" 
        />
        CAD
      </CurrencyButton>
    </Container>
  );
}; 