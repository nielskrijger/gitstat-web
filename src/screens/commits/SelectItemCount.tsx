import React, { CSSProperties, FC, ReactElement, useEffect } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
  { label: '500', value: '500' },
];

const defaultOption = options[0];

const SelectItemContainer = styled.div`
  display: inline-block;
  width: 100px;
  margin-left: 0.3rem;
`;

interface SelectItemCountProps {
  readonly onChange: (value: number) => void;
  readonly value: number;
  readonly style?: CSSProperties;
}

const SelectItemCount: FC<SelectItemCountProps> = ({ onChange, value, style }): ReactElement => {
  useEffect(() => {
    onChange(parseInt(defaultOption.value, 10));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectItemContainer style={style}>
      <Select
        name="color"
        defaultValue={defaultOption}
        options={options}
        value={{ value: `${value}`, label: `${value}` }}
        onChange={(selectedValue: ValueType<SelectOptionType>): void => {
          onChange(parseInt((selectedValue as SelectOptionType).value, 10));
        }}
      />
    </SelectItemContainer>
  );
};

export default SelectItemCount;
