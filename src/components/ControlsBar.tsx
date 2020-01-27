import styled from 'styled-components';

const ControlsBar = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.3rem;
  }
`;

export default ControlsBar;
