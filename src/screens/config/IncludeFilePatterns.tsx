import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import HoverButton from '../../components/buttons/HoverButton';
import ClearableInput from '../../components/form/ClearableInput';
import StyledInput from '../../components/form/StyledInput';
import PlusIcon from '../../components/icons/PlusIcon';
import {
  addConfigIndex,
  removeConfigIndex,
  updateConfigIndex,
} from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';

const FormRow = styled.div`
  margin-bottom: 0.5rem;
`;

const IncludeFilePatterns: FC = (): ReactElement => {
  const { config, dispatch } = useConfig();

  return (
    <>
      {config.includeFileFilters.map((value, index) => (
        <FormRow key={index}>
          {config.includeFileFilters.length === 1 ? (
            <StyledInput
              value={value}
              placeholder="Filepath regex..."
              onChange={(ev): void => {
                dispatch(updateConfigIndex('includeFileFilters', index, ev.target.value));
              }}
            />
          ) : (
            <ClearableInput
              value={value}
              placeholder="Filepath regex..."
              onChange={(ev): void => {
                dispatch(updateConfigIndex('includeFileFilters', index, ev.target.value));
              }}
              onClear={(): void => {
                dispatch(removeConfigIndex('includeFileFilters', index));
              }}
            />
          )}
        </FormRow>
      ))}
      <HoverButton onClick={(): void => dispatch(addConfigIndex('includeFileFilters', ''))}>
        <PlusIcon /> Add regex pattern
      </HoverButton>
    </>
  );
};

export default IncludeFilePatterns;
