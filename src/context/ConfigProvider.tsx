import React, { createContext, Dispatch, FC, ReactElement, useContext } from 'react';
import { usePersistedReducer } from '../hooks/usePersistedReducer';
import reducer, { Actions, Config, initialState } from '../reducers/configReducer';

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

export const ConfigProvider: FC = ({ children }): ReactElement => {
  const [state, dispatch] = usePersistedReducer(reducer, initialState, 'config');

  const value = { state, dispatch };
  return <ConfigStore.Provider value={value}>{children}</ConfigStore.Provider>;
};
