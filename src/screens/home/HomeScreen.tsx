import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import PageLayout from '../../layouts/PageLayout';
import { colors } from '../../styles/colors';
import UploadDragAndDrop from '../upload/UploadDragAndDrop';
import UploadInstructions from '../upload/UploadInstructions';
import EdgeWarning from './EdgeWarning';
import SelectSampleProject from './SelectSampleProject';

const Disclaimer = styled.p`
  font-size: 0.85em;
  margin: 1rem 0;
  color: ${colors.textSecondary};
`;

const HomeScreen: FC = (): ReactElement => (
  <PageLayout>
    <EdgeWarning />

    <H1>Git stats & graphs</H1>
    <p>Visualize your project&apos;s git history.</p>

    <H2>Upload GIT history</H2>
    <UploadInstructions />
    <UploadDragAndDrop />
    <Disclaimer>
      This datafile is never stored! If you reopen or refresh this website you&apos;ll have to
      supply the same file again.
    </Disclaimer>

    <H2>Alternatively...</H2>
    <p>Select a sample project:</p>
    <SelectSampleProject />
  </PageLayout>
);

export default HomeScreen;
