import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import ExcludeFilePatterns from './ExcludeFilePatterns';
import IncludeFilePatterns from './IncludeFilePatterns';
import SelectAuthors from './SelectAuthors';

const ConfigContainer = styled.div`
  max-width: 800px;
`;

const ConfigTable = styled.table`
  width: 100%;
`;

const FirstTD = styled.td`
  vertical-align: top;
  font-weight: bold;
  padding: 0.8rem 0.4rem;
`;

const SecondTD = styled.td`
  vertical-align: top;
  padding: 0.8rem 0.4rem;
`;

const Description = styled.p`
  margin: 0 0 0.5rem 0;
`;

const ConfigScreen: FC = (): ReactElement => {
  return (
    <ConfigContainer>
      <H1>Config</H1>

      <ConfigTable>
        <tr>
          <FirstTD>File patterns</FirstTD>
          <SecondTD>
            <Description>
              Defines any regex patterns whose filepath should match. Defaults to all files (
              <code>.*</code>).
            </Description>
            <IncludeFilePatterns />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Exclude file patterns</FirstTD>
          <SecondTD>
            <Description>Any exclusion filters override the previous patterns.</Description>
            <ExcludeFilePatterns />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Exclude authors</FirstTD>
          <SecondTD>
            <Description>
              Exclude the following authors from the stats (including totals).
            </Description>
            <SelectAuthors />
          </SecondTD>
        </tr>
      </ConfigTable>
    </ConfigContainer>
  );
};

export default ConfigScreen;
