import { useConfig } from '../context/ConfigProvider';
import { ConfigMerge } from '../reducers/configReducer';

export function useMergeConfig(): (options: ConfigMerge) => void {
  const { dispatch } = useConfig();

  return (options: ConfigMerge): void =>
    dispatch({
      type: 'MERGE_CONFIG',
      options,
    });
}
