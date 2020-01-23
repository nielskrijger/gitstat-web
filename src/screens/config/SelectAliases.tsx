import React, { FC, ReactElement, useMemo } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { SelectOptionType } from '../../types/select';

const SelectContainer = styled.div`
  width: 100%;
  padding-left: 0.5rem;
`;

interface SelectAliasesProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

const SelectAliases: FC<SelectAliasesProps> = ({ options, value, onChange }): ReactElement => {
  const values = useMemo(() => value.map(name => ({ label: name, value: name })), [value]);
  const nameOptions = useMemo(() => options.map(name => ({ label: name, value: name })), [options]);
  return (
    <SelectContainer>
      <Select
        placeholder="Aliases..."
        name="select-aliases"
        isMulti
        value={values}
        options={nameOptions}
        isClearable={false}
        onChange={(selected: ValueType<SelectOptionType>): void => {
          if (selected && Array.isArray(selected)) {
            onChange(selected.map(selectedOption => (selectedOption as SelectOptionType).value));
          } else {
            onChange([]);
          }
        }}
      />
    </SelectContainer>
  );
};

export default SelectAliases;
