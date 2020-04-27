import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface Props {
  readonly hasError: boolean;
  readonly children: ReactNode;
}

const StyledErrorMessage = styled.div<Props>`
  color: ${colors.error};
  padding-top: 0.3em;
  max-height: ${({ hasError }): string => (hasError ? '100px' : '0')};
  transition: max-height 1.5s ease-out;
`;

export default ({ hasError, children }: Props): ReactElement | null => {
  if (!hasError) return null;
  return <StyledErrorMessage hasError={hasError}>{hasError && children}</StyledErrorMessage>;
};
