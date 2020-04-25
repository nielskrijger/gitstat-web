import styled from 'styled-components';
import { colors } from '../styles/colors';

interface Props {
  readonly excluded?: boolean;
}

export default styled.div`
  color: ${({ excluded = false }: Props): string =>
    excluded ? colors.textDisabled : colors.error};
`;
