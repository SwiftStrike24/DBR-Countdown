import styled from 'styled-components';
import { useCountdown } from '../hooks/useCountdown';

const TimerContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const TimeUnit = styled.div`
  text-align: center;
`;

const TimeValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  text-transform: uppercase;
`;

export const CountdownTimer = () => {
  const timeLeft = useCountdown();

  return (
    <TimerContainer>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <TimeUnit key={unit}>
          <TimeValue>{String(value).padStart(2, '0')}</TimeValue>
          <TimeLabel>{unit}</TimeLabel>
        </TimeUnit>
      ))}
    </TimerContainer>
  );
};
