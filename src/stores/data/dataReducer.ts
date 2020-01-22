import { GitStatData } from '../../types/gitStatData';
import { ClearDataAction, LoadDataAction } from './dataActions';

export const initialState = {
  version: '',
  projects: [],
};

export type Actions = LoadDataAction | ClearDataAction;

const reducer = (state: GitStatData, action: Actions): GitStatData => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.data,
      };
    case 'CLEAR_DATA':
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default reducer;
