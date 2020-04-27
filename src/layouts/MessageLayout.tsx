import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';

const Container = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem;
  height: 100%;
`;

const MessageContainer = styled.div`
  margin: 1rem 0;
`;

interface Props {
  children: ReactNode;
}

export default ({ children }: Props): ReactElement => (
  <Container>
    <Logo />
    <MessageContainer>{children}</MessageContainer>
  </Container>
);
