import React, { ReactElement } from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import UploadDragAndDrop from './UploadDragAndDrop';
import UploadInstructions from './UploadInstructions';

const Container = styled.div`
  max-width: 500px;
`;

export default (): ReactElement => (
  <Container>
    <H1>Change data</H1>
    <UploadInstructions />
    <UploadDragAndDrop />
  </Container>
);
