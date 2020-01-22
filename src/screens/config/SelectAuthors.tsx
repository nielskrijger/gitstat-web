import React, { FC, ReactElement, useMemo } from 'react';
import { ValueType } from 'react-select';
import Select from '../../components/form/Select';
import { useAuthorNames } from '../../selectors/authors';
import { updateConfig } from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';
import { SelectOptionType } from '../../types/select';

const SelectAuthors: FC = (): ReactElement => {
  const authors = useAuthorNames();
  const { config, dispatch } = useConfig();

  const options = useMemo(() => authors.map(name => ({ label: name, value: name })), [authors]);
  const value = useMemo(() => options.filter(opt => config.excludeAuthors.includes(opt.value)), [
    options,
    config,
  ]);

  return (
    <Select
      name="exclude-authors"
      isMulti
      value={value}
      options={options}
      selectAll
      onChange={(selectedAuthors: ValueType<SelectOptionType>): void => {
        dispatch(
          updateConfig(
            'excludeAuthors',
            authors.filter(
              name => Array.isArray(selectedAuthors) && selectedAuthors.some(e => e.value === name),
            ),
          ),
        );
      }}
    />
  );
};

export default SelectAuthors;
