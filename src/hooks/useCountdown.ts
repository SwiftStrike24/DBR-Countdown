import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { TARGET_DATE } from '../config/constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const utcNow = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      );
      const difference = Math.floor((TARGET_DATE.getTime() - utcNow) / 1000);
      
      if (difference <= 0) {
        setTimeLeft(prev => {
          if (prev.isComplete) return prev;
          return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
        });
        return;
      }

      const days = Math.floor(difference / (24 * 60 * 60));
      const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((difference % (60 * 60)) / 60);
      const seconds = difference % 60;

      setTimeLeft(prev => {
        const next = { days, hours, minutes, seconds, isComplete: false };
        return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};
