import React, { ReactElement, useMemo } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { SelectOptionType } from '../../types/select';

const SelectContainer = styled.div`
  width: 20rem;
  align-self: flex-start;
`;

interface Props {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

export default ({ options, value, onChange }: Props): ReactElement => {
  const nameOptions = useMemo(() => options.map((name) => ({ label: name, value: name })), [
    options,
  ]);

  return (
    <SelectContainer>
      <Select
        placeholder="Real name..."
        name="select-real-name"
        defaultValue={value ? { label: value, value } : undefined}
        options={nameOptions}
        onChange={(selected: ValueType<SelectOptionType>): void => {
          if (selected) onChange((selected as SelectOptionType).value);
        }}
      />
    </SelectContainer>
  );
};
