import { GitStatData } from '../../types/gitStatData';
import { LoadDataAction } from './dataActions';

export const initialState = {
  version: '',
  projects: [],
};

export type Actions = LoadDataAction;

export default (state: GitStatData, action: Actions): GitStatData => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.data,
      };
    default:
      return { ...state };
  }
};
