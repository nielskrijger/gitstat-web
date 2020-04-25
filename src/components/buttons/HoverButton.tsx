import { lighten } from 'polished';
import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';
import LoadingDots from '../LoadingDots';

interface Props {
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
}

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  border: 0;
  border-radius: ${borderRadius};
  color: ${colors.textSecondary};
  padding: 0.6rem;
  background-color: transparent;
  outline: none;
  width: 100%;
  text-align: left;
  transition: all 0.1s ease-in-out;

  :hover {
    background-color: ${colors.backgroundSecondary};
    color: ${lighten(0.15, colors.textSecondary)};
    cursor: pointer;
  }
`;

const HoverButton: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  disabled,
  isLoading = false,
  ...props
}): ReactElement => (
  <StyledButton disabled={isLoading || disabled} {...props}>
    {children}
    {isLoading && <LoadingDots />}
  </StyledButton>
);

export default HoverButton;
