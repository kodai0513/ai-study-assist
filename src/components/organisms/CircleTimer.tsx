import React from 'react';
import { TimerDisplay } from '../molecules/TimerDisplay';
import { useTimer } from '../../hooks/useTimer';

export const CircleTimer: React.FC = () => {
  const { timer, progress } = useTimer();
  
  return (
    <TimerDisplay
      timeLeft={timer.timeLeft}
      mode={timer.mode}
      progress={progress}
    />
  );
};