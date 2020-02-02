import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

const EdgeWarningContainer = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
  justify-content: center;
  color: ${colors.error};
  border: 1px solid ${colors.error};
`;

const EdgeWarning: FC = (): ReactElement | null => {
  if (navigator.userAgent.indexOf('Edge') === -1) {
    return null;
  }

  return (
    <EdgeWarningContainer>
      Due to some bug <strong>Microsoft Edge</strong> is extremely slow. I haven&apos;t found the
      time yet to investigate what causes it. Please use Firefox, Chrome or Safari for the time
      being which do not appear to be affected.
    </EdgeWarningContainer>
  );
};

export default EdgeWarning;
