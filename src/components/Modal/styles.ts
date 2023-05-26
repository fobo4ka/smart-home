import styled from 'styled-components';
import { rgba } from 'polished';

import { COLORS } from '../../constants';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px ${rgba(COLORS.white, 0.12)};
`;

export const CloseButton = styled.button`
  cursor: pointer;
  margin: 0;
  background-color: transparent;
  border-color: transparent;
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  color: ${rgba(COLORS.gray, 0.5)};
  outline: 0;
  transition: color ease-in 150ms;

  &:hover {
    color: ${COLORS.gray};
  }

  &:active: {
    color: ${COLORS.gray};
  }
`;
