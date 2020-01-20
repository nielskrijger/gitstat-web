import React, { FC, ReactElement, useMemo } from 'react';
import { ValueType } from 'react-select';
import { useMergeConfig } from '../../actions/config';
import Select from '../../components/form/Select';
import { useConfig } from '../../context/ConfigProvider';
import { useAuthorNames } from '../../selectors/authors';
import { SelectOptionType } from '../../types/select';

const SelectAuthors: FC = (): ReactElement => {
  const authors = useAuthorNames();
  const { config } = useConfig();
  const mergeConfig = useMergeConfig();

  const options = useMemo(() => authors.map(name => ({ label: name, value: name })), [authors]);
  const value = useMemo(() => options.filter(opt => config.excludeAuthors.includes(opt.value)), [
    options,
    config,
  ]);

  return (
    <div>
      {authors.length > 0 && (
        <Select
          name="exclude-authors"
          isMulti
          value={value}
          options={options}
          selectAll
          onChange={(selectedAuthors: ValueType<SelectOptionType>): void => {
            mergeConfig({
              excludeAuthors: authors.filter(
                name =>
                  Array.isArray(selectedAuthors) && selectedAuthors.some(e => e.value === name),
              ),
            });
          }}
        />
      )}
    </div>
  );
};

export default SelectAuthors;
