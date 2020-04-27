import React, { ReactElement } from 'react';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import Select from '../../components/form/Select';
import { AggregationFnType } from '../../hooks/useAggregationFn';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: 'Commits', value: AggregationFnType.COMMITS },
  { label: 'Lines added + deleted', value: AggregationFnType.MUTATIONS },
  { label: 'Lines added - deleted', value: AggregationFnType.DIFF },
  { label: 'Lines added', value: AggregationFnType.ADDITIONS },
  { label: 'Lines deleted', value: AggregationFnType.DELETIONS },
];

const SelectContainer = styled.div`
  width: 200px;
`;

interface Props {
  value?: AggregationFnType;
  onChange: (aggregateFnName: AggregationFnType) => void;
}

export default ({ onChange, value = AggregationFnType.COMMITS }: Props): ReactElement => (
  <SelectContainer>
    <Select
      name="select-aggregation"
      defaultValue={options.find((opt) => opt.value === value)}
      options={options}
      onChange={(selected: ValueType<SelectOptionType>): void => {
        onChange((selected as SelectOptionType).value as AggregationFnType);
      }}
    />
  </SelectContainer>
);
