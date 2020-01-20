import React, { FC, ReactElement } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { OrderByType } from '../../selectors/commits';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: 'Commit date', value: OrderByType.TIME },
  { label: 'Additions + deletions', value: OrderByType.MUTATIONS },
  { label: 'Additions', value: OrderByType.ADDITIONS },
  { label: 'Deletions', value: OrderByType.DELETIONS },
];

interface SelectSortByProps {
  value?: OrderByType;
  onChange: (value: OrderByType) => void;
}

const SelectContainer = styled.div`
  width: 210px;
  margin-left: 0.3rem;
`;

const SelectOrderBy: FC<SelectSortByProps> = ({
  value = OrderByType.TIME,
  onChange,
}): ReactElement => (
  <SelectContainer>
    <Select
      name="select-order-by"
      defaultValue={options.find(opt => opt.value === value)}
      options={options}
      onChange={(selectedValue: ValueType<SelectOptionType>): void => {
        onChange((selectedValue as SelectOptionType).value as OrderByType);
      }}
    />
  </SelectContainer>
);

export default SelectOrderBy;
