import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import H1 from '../../components/H1';
import ExcludeFilePatterns from './ExcludeFilePatterns';
import IncludeFilePatterns from './IncludeFilePatterns';
import IncludeMergeCommits from './IncludeMergeCommits';
import ResetExcludeCommits from './ResetExcludeCommits';
import SelectAlias from './SelectAlias';
import SelectExcludeAuthors from './SelectExcludeAuthors';

const ConfigContainer = styled.div`
  max-width: 800px;
`;

const ConfigTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const FirstTD = styled.td`
  vertical-align: top;
  font-weight: bold;
  padding: 0.8rem 0.4rem;
  width: 10rem;
`;

const SecondTD = styled.td`
  vertical-align: top;
  padding: 0.8rem 0.4rem;
`;

const Description = styled.p`
  margin: 0 0 0.5rem 0;
`;

export default (): ReactElement => (
  <ConfigContainer>
    <H1>Config</H1>

    <ConfigTable>
      <tbody>
        <tr>
          <FirstTD>General</FirstTD>
          <SecondTD>
            <IncludeMergeCommits />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Include files</FirstTD>
          <SecondTD>
            <Description>
              Regex expression to specify which files are included. Defaults to all files (
              <code>.*</code>).
            </Description>
            <IncludeFilePatterns />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Exclude files</FirstTD>
          <SecondTD>
            <Description>
              Regex expressions to exclude files. This overrides &ldquo;Include files&rdquo;.
            </Description>
            <ExcludeFilePatterns />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Aliases</FirstTD>
          <SecondTD>
            <Description>Deduplicate user names.</Description>
            <SelectAlias />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Exclude commits</FirstTD>
          <SecondTD>
            <Description>
              Exclude commits in the <Link to="/commits">Commits</Link>-table.
            </Description>
            <ResetExcludeCommits />
          </SecondTD>
        </tr>
        <tr>
          <FirstTD>Exclude authors</FirstTD>
          <SecondTD>
            <Description>
              Exclude the following authors from the stats (including totals).
            </Description>
            <SelectExcludeAuthors />
          </SecondTD>
        </tr>
      </tbody>
    </ConfigTable>
  </ConfigContainer>
);
