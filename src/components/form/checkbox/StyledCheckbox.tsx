import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import CheckIcon from './CheckIcon';

interface Props {
  checked: boolean;
}

export default styled.div<Props>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }): string => (checked ? colors.primary : colors.inputBackground)};
  border-radius: 3px;
  border: 1px solid ${colors.inputBorder};
  cursor: pointer;
  margin-right: 0.5rem;

  ${CheckIcon} {
    visibility: ${({ checked }): string => (checked ? 'visible' : 'hidden')};
  }
`;
