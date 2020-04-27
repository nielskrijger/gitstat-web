import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import CheckIcon from './CheckIcon';
import HiddenCheckbox from './HiddenCheckbox';
import StyledCheckbox from './StyledCheckbox';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}

export default ({ checked, onChange, children }: Props): ReactElement => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={(ev): void => onChange(ev.target.checked)} />
    <StyledCheckbox checked={checked}>
      <CheckIcon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </CheckIcon>
    </StyledCheckbox>
    {children}
  </CheckboxContainer>
);
