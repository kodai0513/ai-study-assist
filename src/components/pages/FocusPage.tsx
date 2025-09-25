import React from 'react';
import { CircleTimer } from '../organisms/CircleTimer';
import { TimerControls } from '../organisms/TimerControls';
import { AiChatPopup } from '../organisms/AiChatPopup';

export const FocusPage: React.FC = () => {
  return (
    // justify-center を削除し、pt-32 を追加
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-32 p-6">
      <div className="w-full max-w-2xl mx-auto text-center space-y-12">
        {/* Timer */}
        <CircleTimer />
        
        {/* Controls */}
        <TimerControls />
        
        {/* AI Chat Button */}
        <AiChatPopup />
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};