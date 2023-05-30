import styled, { css } from 'styled-components';
import { transitions, rgba } from 'polished';
import { COLORS } from '../../../constants';

const THEME = {
  default: {
    default: {
      backgroundColor: rgba(COLORS.gray, 0.2),
      color: COLORS.pink,
      borderColor: COLORS.pink,
    },
    hover: {
      backgroundColor: rgba(COLORS.gray, 0.3),
      color: COLORS.pink,
      borderColor: COLORS.pink,
    },
    active: {
      backgroundColor: rgba(COLORS.gray, 0.4),
      color: COLORS.pink,
      borderColor: COLORS.pink,
    },
  },
  red: {
    default: {
      backgroundColor: rgba(COLORS.pink, 0.2),
      color: COLORS.pink,
      borderColor: COLORS.pink,
    },
    hover: {
      backgroundColor: rgba(COLORS.pink, 0.3),
      color: COLORS.pink,
      borderColor: COLORS.pink,
    },
    active: {
      backgroundColor: rgba(COLORS.pink, 0.4),
      color: COLORS.pink,
      borderColor: COLORS.pink,
    },
  },
};

export const StyledButton = styled.button<{ $color: 'default' | 'red' }>`
  outline: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  ${({ $color }) => css`
    background-color: ${THEME[$color].default.backgroundColor};
    color: ${THEME[$color].default.color};
    border: 1px solid ${THEME[$color].default.borderColor};
    ${transitions([ 'color', 'background-color', 'border-color' ], '150ms ease-in')};

    &:hover {
      background-color: ${THEME[$color].hover.backgroundColor};
      color: ${THEME[$color].hover.color};
      border-color: ${THEME[$color].hover.borderColor};
    }

    &:active {
      background-color: ${THEME[$color].active.backgroundColor};
      color: ${THEME[$color].active.color};
      border-color: 1px solid ${THEME[$color].active.borderColor};
    }
  `};
`;
