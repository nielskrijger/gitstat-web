import React, { ReactElement } from 'react';
import DefaultButton from '../../components/buttons/DefaultButton';
import { updateConfig } from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';

export default (): ReactElement => {
  const { config, dispatch } = useConfig();
  if (config.excludeCommits.length === 0) {
    return <></>;
  }
  return (
    <DefaultButton onClick={(): void => dispatch(updateConfig('excludeCommits', []))}>
      Reset all excluded commits ({config.excludeCommits.length})
    </DefaultButton>
  );
};
