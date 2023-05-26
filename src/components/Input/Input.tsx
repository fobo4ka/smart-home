import React from 'react';

import { Label, StyledInput, Message, Wrapper } from './styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  isValid: boolean;
  validationMessage: string;
  value: string | number;
}

export const Input: React.FC<InputProps> = ({
  onChange,
  name,
  label,
  validationMessage,
  value,
  isValid = true,
  ...rest
}) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput id={name} {...{ value, onChange, ...rest }} />
      {validationMessage !== '' && (
        <Message $transform={isValid ? 'translateY(0)' : 'translateY(100%)'} $isVisible={!isValid}>
          {validationMessage}
        </Message>
      )}
    </Wrapper>
  );
};
