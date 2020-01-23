import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

// Based on https://codesandbox.io/s/yvp79r4251
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface StyledCheckboxProps {
  checked: boolean;
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }): string => (checked ? colors.primary : colors.inputBackground)};
  border-radius: 3px;
  border: 1px solid ${colors.inputBorder};
  transition: all 150ms;
  cursor: pointer;
  margin-right: 0.5rem;

  ${Icon} {
    visibility: ${({ checked }): string => (checked ? 'visible' : 'hidden')};
  }
`;

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ checked, label, onChange }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={(ev): void => onChange(ev.target.checked)} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
    {label}
  </CheckboxContainer>
);

export default Checkbox;
