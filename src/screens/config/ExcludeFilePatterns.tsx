import React, { ReactElement } from 'react';
import HoverButton from '../../components/buttons/HoverButton';
import ClearableInput from '../../components/form/ClearableInput';
import PlusIcon from '../../components/icons/PlusIcon';
import {
  addConfigIndex,
  removeConfigIndex,
  updateConfigIndex,
} from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';

export default (): ReactElement => {
  const { config, dispatch } = useConfig();

  return (
    <>
      {config.excludeFileFilters.map((value, index) => (
        <ClearableInput
          value={value}
          key={index}
          placeholder="Filepath regex..."
          style={{ paddingBottom: '0.5rem' }}
          onChange={(ev): void => {
            dispatch(updateConfigIndex('excludeFileFilters', index, ev.target.value));
          }}
          onClear={(): void => {
            dispatch(removeConfigIndex('excludeFileFilters', index));
          }}
        />
      ))}
      <HoverButton onClick={(): void => dispatch(addConfigIndex('excludeFileFilters', ''))}>
        <PlusIcon /> Add exclude file pattern
      </HoverButton>
    </>
  );
};
