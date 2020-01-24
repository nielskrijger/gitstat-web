import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { transitionDelay } from '../../styles/styles';

const IconButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 1.1rem;
  height: 1.3rem;
  display: inline-block;
  margin: 0 0.5rem;
  color: ${colors.text};
  transition: all ${transitionDelay}ms ease-in-out;

  &:hover {
    color: ${colors.textDisabled};
  }
`;

export default IconButton;
