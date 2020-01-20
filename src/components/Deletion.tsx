import styled from 'styled-components';
import { colors } from '../styles/colors';

interface DeletionProps {
  readonly excluded?: boolean;
}

const Deletion = styled.div`
  color: ${({ excluded = false }: DeletionProps): string =>
    excluded ? colors.textDisabled : colors.error};
`;

export default Deletion;
