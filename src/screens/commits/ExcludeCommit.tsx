import React, { ReactElement, useState } from 'react';
import Checkbox from '../../components/form/checkbox/Checkbox';
import { addConfigIndex, updateConfig } from '../../stores/config/configActions';
import { useConfig } from '../../stores/config/ConfigProvider';

interface Props {
  value: string;
}

export default ({ value }: Props): ReactElement => {
  const { config, dispatch } = useConfig();
  const [isChecked, setIsChecked] = useState(config.excludeCommits.includes(value));

  const onChange = (checked: boolean): void => {
    // Use timeout and separate state to make it appear instant
    setIsChecked(checked);
    setTimeout(() => {
      if (checked) {
        dispatch(addConfigIndex('excludeCommits', value));
      } else {
        dispatch(
          updateConfig(
            'excludeCommits',
            config.excludeCommits.filter((item) => item !== value),
          ),
        );
      }
    });
  };

  return (
    <Checkbox onChange={onChange} checked={isChecked}>
      Exclude commit
    </Checkbox>
  );
};
