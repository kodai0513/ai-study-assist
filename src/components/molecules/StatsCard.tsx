import React from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { LucideIcon } from 'lucide-react';

export interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple';
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  return (
    <Card hover>
      <div className="flex items-center justify-between mb-4">
        <Text variant="body" color="slate" weight="medium">{title}</Text>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon icon={icon} size="lg" />
        </div>
      </div>
      <div className="space-y-1">
        <Text variant="h1" color="white" weight="bold">{value}</Text>
        {subtitle && (
          <Text variant="caption" color="secondary">{subtitle}</Text>
        )}
      </div>
    </Card>
  );
};