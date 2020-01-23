import React, { FC, ReactElement } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { GroupByType } from '../../selectors/commits';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: 'by author', value: GroupByType.AUTHOR },
  { label: 'by project', value: GroupByType.PROJECT },
];

interface SelectGroupByProps {
  value?: GroupByType;
  onChange: (value: GroupByType) => void;
}

const SelectContainer = styled.div`
  width: 140px;
  margin-left: 0.3rem;
`;

const SelectGroupBy: FC<SelectGroupByProps> = ({
  value = GroupByType.AUTHOR,
  onChange,
}): ReactElement => (
  <SelectContainer>
    <Select
      name="select-group-by"
      defaultValue={options.find(opt => opt.value === value)}
      options={options}
      onChange={(selected: ValueType<SelectOptionType>): void => {
        onChange((selected as SelectOptionType).value as GroupByType);
      }}
    />
  </SelectContainer>
);

export default SelectGroupBy;
