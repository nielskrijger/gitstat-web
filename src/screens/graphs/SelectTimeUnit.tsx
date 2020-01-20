import { TimeUnit } from 'chart.js';
import React, { FC, ReactElement, useEffect } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { SelectOptionType } from '../../types/select';

export const timeUnitOptions: SelectOptionType[] = [
  { label: 'per day', value: 'day' },
  { label: 'per week', value: 'week' },
  { label: 'per month', value: 'month' },
];

const defaultOption = timeUnitOptions[2];

interface SelectPeriodProps {
  value?: TimeUnit;
  onChange: (value: TimeUnit) => void;
}

const SelectContainer = styled.div`
  width: 130px;
  margin-left: 0.3rem;
`;

const SelectTimeUnit: FC<SelectPeriodProps> = ({ value = 'month', onChange }): ReactElement => {
  useEffect(() => {
    onChange(defaultOption.value as TimeUnit);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectContainer>
      <Select
        name="select-time-unit"
        defaultValue={timeUnitOptions.find(opt => opt.value === value)}
        options={timeUnitOptions}
        onChange={(selectedValue: ValueType<SelectOptionType>): void => {
          onChange((selectedValue as SelectOptionType).value as TimeUnit);
        }}
      />
    </SelectContainer>
  );
};

export default SelectTimeUnit;
