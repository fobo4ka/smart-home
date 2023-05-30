import React from 'react';

import { Label, StyledSelect } from './styles';

export interface TOption {
  label: string;
  value: string;
  description?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: TOption[];
  label: string;
  value: string;
}

export const Select: React.FC<SelectProps> = ({ onChange, name, options, label, value, ...rest }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <StyledSelect id={name} {...rest} defaultValue={value} onChange={onChange}>
      <option value="placeholder" disabled>
        Выберите нужное значение
      </option>
      {options.map((item, key) => (
        <option key={key} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  </div>
);
