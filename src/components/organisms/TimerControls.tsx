import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '../atoms/Button';
import { ThemeInput } from '../molecules/ThemeInput';
import { useTimer } from '../../hooks/useTimer';
import { useAppStore } from '../../store/useAppStore';
import { Text } from '../atoms/Text';


export const TimerControls: React.FC = () => {
  const { timer } = useTimer();
  const { startSession, setTheme, completeSession } = useAppStore();
  const [themeInput, setThemeInput] = useState(timer.theme);

  const handleStart = () => {
    if (timer.mode === 'idle' && themeInput.trim()) {
      startSession(themeInput.trim());
    } else {
      completeSession();
    }
  };

  const handleThemeChange = (value: string) => {
    setThemeInput(value);
    setTheme(value);
  };

  const canStart = timer.mode !== 'idle' || (timer.mode === 'idle' && themeInput.trim());

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-md"> 
        <Text variant="h3" color="secondary" weight="medium">
          {timer.mode !== 'idle' ? "現在の学習テーマ" : "学習テーマを入力してください"}
        </Text>
        <div className='mb-5'></div>
        <ThemeInput
          disabled={timer.mode !== 'idle'}
          value={themeInput}
          onChange={handleThemeChange}
        />
      </div>

      {/* Control buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={handleStart}
          disabled={!canStart}
          variant={timer.mode == 'idle' ? "primary" : "danger"}
          icon={Play}
        >
          {timer.mode === 'idle' ? '勉強開始' : '勉強終了' }
        </Button>
      </div>
    </div>
  );
};