import React, { ReactElement } from 'react';
import Checkbox from '../../components/form/checkbox/Checkbox';
import { updateConfig } from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';

export default (): ReactElement => {
  const { config, dispatch } = useConfig();
  return (
    <Checkbox
      checked={config.includeMergeCommits}
      onChange={(value): void => dispatch(updateConfig('includeMergeCommits', value))}
    >
      Include merge commits
    </Checkbox>
  );
};
