import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface InputError {
  readonly hasError: boolean;
}

const StyledErrorMessage = styled.div<InputError>`
  color: ${colors.error};
  padding-top: 0.3em;
  max-height: ${({ hasError }): string => (hasError ? '100px' : '0')};
  transition: max-height 1.5s ease-out;
`;

const InputError: FC<InputError> = ({ hasError, children }): ReactElement | null => {
  if (!hasError) return null;
  return <StyledErrorMessage hasError={hasError}>{hasError && children}</StyledErrorMessage>;
};

export default InputError;
