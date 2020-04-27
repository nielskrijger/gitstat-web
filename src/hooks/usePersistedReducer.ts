/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, Reducer, ReducerAction, ReducerState, useEffect, useReducer } from 'react';

export function usePersistedReducer<R extends Reducer<any, any>>(
  reducer: R,
  defaultState: any, // Using any here to match reducer API
  key: string,
  storageEngine: Storage = localStorage,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const [state, dispatch] = useReducer(reducer, defaultState, () => {
    const stored = storageEngine.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultState;
  });

  useEffect(() => {
    storageEngine.setItem(key, JSON.stringify(state));
  }, [storageEngine, key, state]);

  return [state, dispatch];
}
