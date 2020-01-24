import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { transitionDelay } from '../../styles/styles';

const IconLink = styled.a`
  all: unset;
  cursor: pointer;
  display: inline-block;
  margin: 0 0.5rem;
  color: ${colors.text};
  transition: all ${transitionDelay}ms ease-in-out;

  &:hover {
    color: ${colors.textDisabled};
  }
`;

export default IconLink;
