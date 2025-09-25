import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavigationItemProps {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  icon,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:text-white hover:bg-slate-700'
      }`}
    >
      {React.createElement(icon, { className: 'w-5 h-5' })}
      <span>{label}</span>
    </button>
  );
};