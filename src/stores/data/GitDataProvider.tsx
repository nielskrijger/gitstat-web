import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { GitStatData } from '../../types/gitStatData';
import reducer, { Actions, initialState } from './dataReducer';

interface ContextProps {
  readonly state: GitStatData;
  readonly dispatch: Dispatch<Actions>;
}

export const GitDataStore = createContext({} as ContextProps);

/**
 * A convenience method to access the git data and dispatch.
 */
export const useGitData = (): { data: GitStatData | null; dispatch: Dispatch<Actions> } => {
  const { state: data, dispatch } = useContext(GitDataStore);
  return { data, dispatch };
};

interface Props {
  children: ReactNode;
}

export default ({ children }: Props): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <GitDataStore.Provider value={value}>{children}</GitDataStore.Provider>;
};
