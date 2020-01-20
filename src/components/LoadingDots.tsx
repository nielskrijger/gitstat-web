import styled, { keyframes } from 'styled-components';

const dots = keyframes`
  0%, 20% {
    color: transparent;
    text-shadow: .25em 0 0 transparent, .5em 0 0 transparent;
   }
  40% {
    color: #999;
    text-shadow: .25em 0 0 transparent, .5em 0 0 transparent;
  }
  60% {
    text-shadow: .25em 0 0 #999, .5em 0 0 transparent;
  }
  80%, 100% {
    text-shadow: .25em 0 0 #999, .5em 0 0 #999;
  }
`;

const LoadingDots = styled.span`
  :after {
    content: '.';
    animation: ${dots} 1s steps(5, end) infinite;
  }
`;

export default LoadingDots;
