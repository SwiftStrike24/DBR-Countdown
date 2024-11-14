import React, { createContext, useContext, useState, useCallback } from 'react';
import { AIRDROP_AMOUNT } from '../config/constants';

interface AirdropContextType {
  airdropAmount: number;
  setAirdropAmount: (amount: number) => void;
  resetToDefault: () => void;
}

const AirdropContext = createContext<AirdropContextType | undefined>(undefined);

export const AirdropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [airdropAmount, setAirdropAmount] = useState<number>(AIRDROP_AMOUNT);

  const resetToDefault = useCallback(() => {
    setAirdropAmount(AIRDROP_AMOUNT);
  }, []);

  return (
    <AirdropContext.Provider value={{ airdropAmount, setAirdropAmount, resetToDefault }}>
      {children}
    </AirdropContext.Provider>
  );
};

export const useAirdrop = () => {
  const context = useContext(AirdropContext);
  if (!context) throw new Error('useAirdrop must be used within AirdropProvider');
  return context;
}; 