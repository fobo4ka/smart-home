import React from 'react';

import { StyledButton } from './styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: string;
  color?: 'default' | 'red';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, color = 'default', ...rest }) => (
  <StyledButton $color={color} {...{ onClick, ...rest }}>
    {children}
  </StyledButton>
);
