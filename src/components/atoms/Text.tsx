import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'white' | 'slate';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'white',
  weight = 'normal',
  align = 'left',
  className = '',
}) => {
  const variantClasses = {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-xl',
    h4: 'text-lg',
    body: 'text-base',
    caption: 'text-sm',
    label: 'text-sm font-medium',
  };

  const colorClasses = {
    primary: 'text-blue-400',
    secondary: 'text-slate-400',
    accent: 'text-green-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
    white: 'text-white',
    slate: 'text-slate-300',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Component = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';
  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${weightClasses[weight]} ${alignClasses[align]} ${className}`;

  return React.createElement(Component, { className: classes }, children);
};