import styled from 'styled-components';
import React, { FC, HTMLProps, ReactElement } from 'react';
import { colors } from '../styles/colors';
import LoadingDots from './LoadingDots';

interface ButtonProps {
  readonly isLoading?: boolean;
}

const StyledButton = styled.button`
  border: 1px solid ${colors.border};
  color: ${colors.text};
  padding: 0.5rem 1.2rem 0.6rem 1.2rem;
  font-weight: 400;
  background-color: ${colors.button};

  :hover {
    background-color: ${colors.buttonHover};
    cursor: pointer;
  }
`;

const Button: FC<ButtonProps & HTMLProps<HTMLButtonElement>> = ({
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

export default Button;
