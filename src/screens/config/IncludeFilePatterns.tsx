import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { useMergeConfig } from '../../actions/config';
import StyledInput from '../../components/form/StyledInput';
import { useConfig } from '../../context/ConfigProvider';

const FormRow = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;

const IncludeFilePatterns: FC = (): ReactElement => {
  const { config } = useConfig();
  const mergeConfig = useMergeConfig();

  return (
    <div style={{ padding: '' }}>
      {config.includeFileFilters.map((value, index) => (
        <FormRow key={index}>
          <StyledInput
            value={value}
            onChange={value => {
              console.log('value', value);
              // mergeConfig({
              //   includeFileFilters: authors.filter(
              //     name =>
              //       !Array.isArray(selectedAuthors) || !selectedAuthors.some(e => e.value === name),
              //   ),
              // });
            }}
          />
        </FormRow>
      ))}
    </div>
  );
};

export default IncludeFilePatterns;
