import React from 'react';
import { Brain, Timer, BarChart3 } from 'lucide-react';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { NavigationItem } from '../molecules/NavigationItem';

export interface HeaderProps {
  activeView: 'focus' | 'dashboard';
  onViewChange: (view: 'focus' | 'dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon icon={Brain} size="xl" color="text-blue-400" />
          <Text variant="h3" color="white" weight="semibold">
            AI学習パートナー
          </Text>
        </div>
        
        <nav className="flex space-x-1">
          <NavigationItem
            label="ポモドーロ"
            icon={Timer}
            active={activeView === 'focus'}
            onClick={() => onViewChange('focus')}
          />
          
          <NavigationItem
            label="ダッシュボード"
            icon={BarChart3}
            active={activeView === 'dashboard'}
            onClick={() => onViewChange('dashboard')}
          />
        </nav>
      </div>
    </header>
  );
};