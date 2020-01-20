import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
`;

const MessageContainer = styled.div`
  margin: 1rem 0 3rem 0;
`;

const PageLayout: FC = ({ children }): ReactElement => (
  <Container>
    <Logo />
    <MessageContainer>{children}</MessageContainer>
  </Container>
);

export default PageLayout;
