import React, { FC, ReactElement } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { GroupByType } from '../../selectors/commits';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: 'by project', value: GroupByType.PROJECT },
  { label: 'by author', value: GroupByType.AUTHOR },
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
  value = GroupByType.PROJECT,
  onChange,
}): ReactElement => (
  <SelectContainer>
    <Select
      name="select-group-by"
      defaultValue={options.find(opt => opt.value === value)}
      options={options}
      onChange={(selectedValue: ValueType<SelectOptionType>): void => {
        onChange((selectedValue as SelectOptionType).value as GroupByType);
      }}
    />
  </SelectContainer>
);

export default SelectGroupBy;
