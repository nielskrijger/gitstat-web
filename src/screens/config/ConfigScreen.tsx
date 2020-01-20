import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import H3 from '../../components/H3';
import IncludeFilePatterns from './IncludeFilePatterns';
import SelectAuthors from './SelectAuthors';

const ConfigContainer = styled.div`
  max-width: 800px;
`;

const ConfigScreen: FC = (): ReactElement => {
  return (
    <ConfigContainer>
      <H1>Config</H1>

      <H3>File patterns</H3>
      <IncludeFilePatterns />

      <H3>Exclude authors</H3>
      <p>Exclude the following authors from the stats (including totals).</p>
      <SelectAuthors />
    </ConfigContainer>
  );
};

export default ConfigScreen;
