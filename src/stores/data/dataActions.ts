import { GitStatData } from '../../types/gitStatData';

export interface LoadDataAction {
  readonly type: 'LOAD_DATA';
  readonly data: GitStatData;
}

export function loadData(data: GitStatData): LoadDataAction {
  sessionStorage.clear();
  return {
    type: 'LOAD_DATA',
    data,
  };
}
