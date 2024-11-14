import React, { memo } from 'react';
import styled from 'styled-components';
import { useCountdown } from '../hooks/useCountdown';

const TimerContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 768px) {
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: nowrap;
  }
`;

const TimeUnitContainer = styled.div`
  text-align: center;
`;

const TimeValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  text-transform: uppercase;
`;

const CompletedMessage = styled.div`
  font-size: 1.5rem;
  color: #FBFF3A;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    padding: 2rem;
  }
`;

const ClaimButton = styled.a`
  display: inline-block;
  background: #FBFF3A;
  color: #000;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const TimeUnit = memo(({ label, value }: { label: string; value: number }) => (
  <TimeUnitContainer>
    <TimeValue>{String(value).padStart(2, '0')}</TimeValue>
    <TimeLabel>{label}</TimeLabel>
  </TimeUnitContainer>
));

TimeUnit.displayName = 'TimeUnit';

export const CountdownTimer = memo(() => {
  const { days, hours, minutes, seconds, isComplete } = useCountdown();

  if (isComplete) {
    return (
      <>
        <CompletedMessage>Claim Now Available! 🎉</CompletedMessage>
        <ClaimButton href="https://debridge.foundation/lfg" target="_blank" rel="noopener noreferrer">
          Claim DBR
        </ClaimButton>
      </>
    );
  }

  return (
    <TimerContainer>
      <TimeUnit label="days" value={days} />
      <TimeUnit label="hours" value={hours} />
      <TimeUnit label="minutes" value={minutes} />
      <TimeUnit label="seconds" value={seconds} />
    </TimerContainer>
  );
});

CountdownTimer.displayName = 'CountdownTimer';
