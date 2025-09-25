import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

export interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const classes = `${sizeClasses[size]} ${color || ''} ${className}`;

  return <IconComponent className={classes} />;
};