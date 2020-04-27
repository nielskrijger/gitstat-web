import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader';

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default (): ReactElement => (
  <Container>
    <Loader />
  </Container>
);
