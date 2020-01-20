import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem 0;
  height: 100%;
`;

const MessageContainer = styled.div`
  margin: 3.7rem;
`;

const PageLayout: FC = ({ children }): ReactElement => (
  <Container>
    <Logo />
    <MessageContainer>{children}</MessageContainer>
  </Container>
);

export default PageLayout;
