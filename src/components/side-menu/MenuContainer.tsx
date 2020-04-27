import styled from 'styled-components';
import { colors } from '../../styles/colors';

export enum MenuModes {
  COLLAPSED = 'collapsed', // TODO not implemented, add this for mobile
  ICONS = 'icons',
  EXPANDED = 'expanded',
}

interface Props {
  readonly mode: MenuModes;
}

export default styled.div<Props>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
  padding: 0 1rem;
  position: relative;
  width: ${({ mode }): string => (mode === MenuModes.EXPANDED ? '11rem' : 'auto')};
`;
