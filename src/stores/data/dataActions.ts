import { GitStatData } from '../../types/gitStatData';

export interface LoadDataAction {
  readonly type: 'LOAD_DATA';
  readonly data: GitStatData;
}

export interface ClearDataAction {
  readonly type: 'CLEAR_DATA';
}

export function loadData(data: GitStatData): LoadDataAction {
  return {
    type: 'LOAD_DATA',
    data,
  };
}

export function clearData(): ClearDataAction {
  return {
    type: 'CLEAR_DATA',
  };
}
