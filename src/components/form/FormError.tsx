import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

const StyledError = styled.div`
  color: ${colors.error};
  padding-bottom: 1rem;
`;

interface Props {
  readonly error?: string;
  readonly show?: boolean;
}

/**
 * Shows a error message if there is one.
 *
 * This component should only be used to show unexpected backend errors.
 * All other form error are field-bound.
 */
export default ({ error, show = true }: Props): ReactElement | null => {
  if (error === undefined || !show) {
    return null;
  }
  return <StyledError>{error}</StyledError>;
};
