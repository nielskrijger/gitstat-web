import React, { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles/colors';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  top: 8px;
  height: 20px;
`;

const Dot = styled.div`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${colors.text};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(13px, 0);
  }
`;

const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const Dot1 = styled(Dot)`
  left: 6px;
  animation: ${ellipsis1} 0.6s infinite;
`;

const Dot2 = styled(Dot)`
  left: 6px;
  animation: ${ellipsis2} 0.6s infinite;
`;

const Dot3 = styled(Dot)`
  left: 20px;
  animation: ${ellipsis2} 0.6s infinite;
`;

const Dot4 = styled(Dot)`
  left: 33px;
  animation: ${ellipsis3} 0.6s infinite;
`;

export default (): ReactElement => (
  <Container>
    <Ellipsis>
      <Dot1 />
      <Dot2 />
      <Dot3 />
      <Dot4 />
    </Ellipsis>
  </Container>
);
