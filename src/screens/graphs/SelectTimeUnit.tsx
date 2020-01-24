import { TimeUnit } from 'chart.js';
import React, { FC, ReactElement, useEffect } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { SelectOptionType } from '../../types/select';

interface SelectTimeUnitOption {
  label: string;
  value: TimeUnit;
}

export const timeUnitOptions: SelectTimeUnitOption[] = [
  { label: 'per day', value: 'day' },
  { label: 'per week', value: 'week' },
  { label: 'per month', value: 'month' },
  { label: 'per year', value: 'year' },
];

const defaultOption = timeUnitOptions[2];

interface SelectPeriodProps {
  value?: TimeUnit;
  onChange: (value: TimeUnit) => void;
}

const SelectContainer = styled.div`
  width: 130px;
`;

const SelectTimeUnit: FC<SelectPeriodProps> = ({ value = 'month', onChange }): ReactElement => {
  useEffect(() => {
    onChange(defaultOption.value);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectContainer>
      <Select
        name="select-time-unit"
        value={timeUnitOptions.find(opt => opt.value === value)}
        options={timeUnitOptions}
        onChange={(selected: ValueType<SelectOptionType>): void => {
          onChange((selected as SelectOptionType).value as TimeUnit);
        }}
      />
    </SelectContainer>
  );
};

export default SelectTimeUnit;
