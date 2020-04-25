import React, { FC } from 'react';
import styled from 'styled-components';
import CheckIcon from './CheckIcon';
import HiddenCheckbox from './HiddenCheckbox';
import StyledCheckbox from './StyledCheckbox';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
`;

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Checkbox: FC<Props> = ({ checked, label, onChange }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={(ev): void => onChange(ev.target.checked)} />
    <StyledCheckbox checked={checked}>
      <CheckIcon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </CheckIcon>
    </StyledCheckbox>
    {label}
  </CheckboxContainer>
);

export default Checkbox;
