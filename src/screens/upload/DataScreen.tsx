import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import DataForm from './DataForm';

const Container = styled.div`
  max-width: 500px;
`;

const DataScreen: FC = (): ReactElement => (
  <Container>
    <DataForm />
  </Container>
);

export default DataScreen;
