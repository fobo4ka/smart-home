import React from 'react';

import { Label, StyledSelect } from './styles';

export interface TOption {
  label: string;
  value: string;
  description?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  onSelect: () => void;
  options: TOption[];
  label: string;
  value: string;
}

export const Select: React.FC<SelectProps> = ({ onChange, name, options, label, onSelect, value, ...rest }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <StyledSelect id={name} {...rest} onSelect={onSelect} value={value || null} defaultValue='placeholder'>
        <option value="placeholder" disabled>Выберите нужное значение</option>
      {options.map((item, key) => (
        <option key={key} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  </div>
);
