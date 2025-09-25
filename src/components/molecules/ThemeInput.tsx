import React from 'react';
import { Input } from '../atoms/Input';

export interface ThemeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ThemeInput: React.FC<ThemeInputProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center">
         <Input
            value={value}
            onChange={onChange}
            placeholder="例: TypeScriptの型システム"
            disabled={disabled}
          />
      </div>
    </div>
  );
};