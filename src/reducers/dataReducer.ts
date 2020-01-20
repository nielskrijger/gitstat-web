import { GitStatData } from '../types/gitStatData';

export const initialState = {
  version: '',
  projects: [],
};

interface LoadData {
  readonly type: 'LOAD_DATA';
  readonly data: GitStatData;
}

interface ClearData {
  readonly type: 'CLEAR_DATA';
}

export type Actions = LoadData | ClearData;

const reducer = (state: GitStatData, action: Actions): GitStatData => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.data,
      };
    case 'CLEAR_DATA':
    default:
      return { ...state };
  }
};

export default reducer;
