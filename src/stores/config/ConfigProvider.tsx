import React, { createContext, Dispatch, ReactElement, ReactNode, useContext } from 'react';
import { usePersistedReducer } from '../../hooks/usePersistedReducer';
import reducer, { Actions, initialState } from './configReducer';
import { Config } from './configTypes';

interface ContextProps {
  readonly state: Config;
  readonly dispatch: Dispatch<Actions>;
}

export const ConfigStore = createContext({} as ContextProps);

/**
 * A convenience method to access the config.
 */
export const useConfig = (): { config: Config; dispatch: Dispatch<Actions> } => {
  const { state: config, dispatch } = useContext(ConfigStore);
  return { config, dispatch };
};

interface Props {
  children: ReactNode;
}

export default ({ children }: Props): ReactElement => {
  const [state, dispatch] = usePersistedReducer(reducer, initialState, 'config');

  const value = { state, dispatch };
  return <ConfigStore.Provider value={value}>{children}</ConfigStore.Provider>;
};
