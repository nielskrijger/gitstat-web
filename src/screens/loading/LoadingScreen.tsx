import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader';

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingScreen: FC = (): ReactElement => (
  <Container>
    <Loader />
  </Container>
);

export default LoadingScreen;
