import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { borderRadius, transitionDelay } from '../../styles/styles';
import LoadingDots from '../LoadingDots';

interface Props {
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
}

const StyledButton = styled.button`
  border: 1px;
  border-radius: ${borderRadius};
  color: ${colors.text};
  padding: 0.5rem 1.2rem 0.6rem 1.2rem;
  font-weight: 400;
  background-color: ${colors.primary};
  outline: none;
  transition: all ${transitionDelay}ms ease-in-out;

  :hover {
    background-color: ${colors.linkHover};
    cursor: pointer;
  }
`;

const DefaultButton: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  disabled,
  isLoading = false,
  ...props
}): ReactElement => {
  return (
    <StyledButton disabled={isLoading || disabled} {...props}>
      {children}
      {isLoading && <LoadingDots />}
    </StyledButton>
  );
};

export default DefaultButton;
