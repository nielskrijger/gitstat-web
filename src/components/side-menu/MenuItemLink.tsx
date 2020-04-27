import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface Props {
  readonly iconOnly: boolean;
}

export default styled(NavLink)<Props>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ iconOnly }): string => (iconOnly ? 'center' : 'flex-start')};
  align-items: center;
  color: ${colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  padding: ${({ iconOnly }): string => (iconOnly ? '0.6rem' : '0.4rem 1.1rem')};

  &:hover {
    color: ${colors.primary};
  }
`;
