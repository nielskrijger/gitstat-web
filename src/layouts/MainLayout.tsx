import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import SideMenu from '../components/side-menu/SideMenu';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 100%;
  min-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`;

interface Props {
  children: ReactNode;
}

export default ({ children }: Props): ReactElement => (
  <Container>
    <SideMenu />
    <Content>{children}</Content>
  </Container>
);
