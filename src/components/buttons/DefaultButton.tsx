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
  border: 0;
  border-radius: ${borderRadius};
  color: ${colors.textSecondary};
  padding: 0.5rem 1.2rem 0.6rem 1.2rem;
  font-weight: 400;
  background-color: ${colors.button};
  outline: none;

  :hover {
    background-color: ${colors.buttonHover};
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
