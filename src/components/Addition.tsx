import styled from 'styled-components';
import { colors } from '../styles/colors';

interface Attrs {
  readonly excluded?: boolean;
}

const Addition = styled.div`
  color: ${({ excluded = false }: Attrs): string =>
    excluded ? colors.textDisabled : colors.success};
`;

export default Addition;
