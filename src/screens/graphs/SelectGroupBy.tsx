import React, { ReactElement } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { GroupByType } from '../../selectors/commits';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: 'by author', value: GroupByType.AUTHOR },
  { label: 'by project', value: GroupByType.PROJECT },
  { label: 'by filetype', value: GroupByType.FILETYPE },
];

interface Props {
  value?: GroupByType;
  onChange: (value: GroupByType) => void;
}

const SelectContainer = styled.div`
  width: 140px;
`;

export default ({ value = GroupByType.AUTHOR, onChange }: Props): ReactElement => (
  <SelectContainer>
    <Select
      name="select-group-by"
      defaultValue={options.find((opt) => opt.value === value)}
      options={options}
      onChange={(selected: ValueType<SelectOptionType>): void => {
        onChange((selected as SelectOptionType).value as GroupByType);
      }}
    />
  </SelectContainer>
);
