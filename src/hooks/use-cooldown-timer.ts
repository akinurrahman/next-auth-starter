'use client';

import { useEffect, useState } from 'react';

export function useCooldownTimer(duration: number = 30) {
  const [timeLeft, setTimeLeft] = useState(0);

  const start = () => {
    setTimeLeft(duration);
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft]);

  return {
    timeLeft,
    isCooling: timeLeft > 0,
    start,
  };
}
