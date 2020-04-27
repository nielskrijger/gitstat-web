import React, { ReactElement, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ValueType } from 'react-select';
import styled from 'styled-components';
import InputError from '../../components/form/InputError';
import Select from '../../components/form/Select';
import { loadData } from '../../stores/data/dataActions';
import { GitDataStore } from '../../stores/data/GitDataProvider';
import { SelectOptionType } from '../../types/select';

const options = [
  { label: 'react', value: 'react.json' },
  { label: 'helm', value: 'helm.json' },
];

const SelectContainer = styled.div`
  margin-left: 0.3rem;
`;

export default (): ReactElement => {
  const { dispatch } = useContext(GitDataStore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const history = useHistory();

  const handleSelectProject = useCallback(
    (value): void => {
      setError(undefined);
      setLoading(true);

      // Process the files within a timeout to allow re-rendering to take place
      setTimeout(() => {
        const request = new XMLHttpRequest();
        request.open('GET', value, true);
        request.responseType = 'json';
        request.onload = (): void => {
          setLoading(false);
          if (!request.response) {
            setError('Failed to load data');
          } else {
            dispatch(loadData(request.response));
            history.push('/graphs');
          }
        };
        request.onerror = (): void => setError('Failed to load data');
        request.send();
      }, 200);
    },
    [dispatch, history, setError, setLoading],
  );

  return (
    <SelectContainer>
      <Select
        isLoading={loading}
        name="select-sample-project"
        options={options}
        onChange={(selectedValue: ValueType<SelectOptionType>): void => {
          handleSelectProject((selectedValue as SelectOptionType).value);
        }}
      />
      <InputError hasError={!!error}>{error}</InputError>
    </SelectContainer>
  );
};
