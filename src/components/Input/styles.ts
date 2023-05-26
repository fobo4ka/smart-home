import styled from 'styled-components';
import { transitions } from 'polished';

import { COLORS } from '../../constants';

export const Wrapper = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 0px 16px 2px 0px;
  color: rgb(128, 129, 133);
  font-size: 12px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  z-index: 1;
`;

export const Message = styled.div<{ $isVisible: boolean; $transform: string }>`
  font-size: 12px;
  color: ${COLORS.orange};
  margin: 0;
  position: absolute;
  bottom: 0;
  transform: ${({ $transform }) => $transform};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'visible' : 'none')};
  z-index: 0;
  ${transitions(['transform', 'opacity'], '150ms ease-out')};
`;
