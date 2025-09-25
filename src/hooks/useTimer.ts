import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export const useTimer = () => {
  const {
    timer,
    setTimeLeft,
    setSessionTotal,
    changeBreakTime,
    changeFocusTime
  } = useAppStore();
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (timer.isRunning && timer.timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(timer.timeLeft - 1);
        if(timer.mode === 'focus') {
          setSessionTotal(1);
        }
      }, 1000);
    } else if (timer.timeLeft === 0 && timer.isRunning) {
      
      if (timer.mode === 'focus') {
        changeBreakTime();
      }
      if(timer.mode == 'break') {
        changeFocusTime();
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timer.isRunning, timer.timeLeft, timer.mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = timer.mode === 'focus' ? 25 * 60 : 5 * 60;
    return ((totalTime - timer.timeLeft) / totalTime) * 100;
  };

  return {
    timer,
    formatTime: formatTime(timer.timeLeft),
    progress: getProgress(),
  };
};