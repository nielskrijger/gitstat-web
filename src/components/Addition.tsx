import styled from 'styled-components';
import { colors } from '../styles/colors';

interface Attrs {
  readonly excluded?: boolean;
}

export default styled.code`
  color: ${({ excluded = false }: Attrs): string =>
    excluded ? colors.textDisabled : colors.success};
`;
