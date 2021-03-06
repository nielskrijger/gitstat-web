import {
  AddConfigIndexAction,
  RemoveConfigIndex,
  UpdateConfigAction,
  UpdateConfigIndexAction,
} from './configActions';
import { Config, ConfigArrayKeys } from './configTypes';

export const initialState = {
  includeMergeCommits: false,
  includeFileFilters: ['.*'],
  excludeFileFilters: [],
  authorAliases: [],
  excludeAuthors: [],
  excludeCommits: [],
};

export type Actions =
  | UpdateConfigAction<keyof Config>
  | UpdateConfigIndexAction<ConfigArrayKeys>
  | AddConfigIndexAction<ConfigArrayKeys>
  | RemoveConfigIndex;

export default (state: Config, action: Actions): Config => {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'ADD_CONFIG_INDEX':
      return {
        ...state,
        [action.key]: [...state[action.key], action.value],
      };
    case 'REMOVE_CONFIG_INDEX':
      return {
        ...state,
        [action.key]: [
          ...state[action.key].slice(0, action.index),
          ...state[action.key].slice(action.index + 1),
        ],
      };
    case 'UPDATE_CONFIG_INDEX':
      return {
        ...state,
        [action.key]: [
          ...state[action.key].slice(0, action.index),
          action.value,
          ...state[action.key].slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
};
