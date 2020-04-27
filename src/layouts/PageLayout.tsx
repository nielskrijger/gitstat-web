import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { device } from '../styles/styles';

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem;
  height: 100%;
`;

const MessageContainer = styled.div`
  margin: 0.4rem;

  @media ${device.small} {
    margin: 1.85rem 3.2rem;
  }
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
