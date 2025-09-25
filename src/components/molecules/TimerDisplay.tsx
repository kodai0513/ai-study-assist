import React from 'react';
import { Text } from '../atoms/Text';
import { TimerMode } from '../../types';

export interface TimerDisplayProps {
  timeLeft: number;
  mode: TimerMode;
  progress: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  mode,
  progress,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getTimerColor = () => {
    switch (mode) {
      case 'focus':
        return 'text-blue-400';
      case 'break':
        return 'text-green-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStrokeColor = () => {
    switch (mode) {
      case 'focus':
        return '#3B82F6';
      case 'break':
        return '#10B981';
      default:
        return '#64748B';
    }
  };

  const getModeText = () => {
    switch (mode) {
      case 'focus':
        return '集中モード';
      case 'break':
        return '休憩モード';
      default:
        return '待機中';
    }
  };

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      <svg
        className="w-full h-full transform -rotate-90"
        width="320"
        height="320"
        viewBox="0 0 320 320"
      >
        {/* Background circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="#334155"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Timer display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-5xl font-bold mb-2 ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </div>
        <Text variant="body" color="secondary" weight="medium">
          {getModeText()}
        </Text>
      </div>
    </div>
  );
};