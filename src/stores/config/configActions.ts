import { UnpackArray } from '../../types/util';
import { Config, ConfigArrayKeys } from './configTypes';

export interface UpdateConfigAction<K extends keyof Config> {
  readonly type: 'UPDATE_CONFIG';
  readonly key: K;
  readonly value: Config[K];
}

export function updateConfig<K extends keyof Config>(
  key: K,
  value: Config[K],
): UpdateConfigAction<K> {
  return {
    type: 'UPDATE_CONFIG',
    key,
    value,
  };
}

export interface AddConfigIndexAction<K extends ConfigArrayKeys> {
  readonly type: 'ADD_CONFIG_INDEX';
  readonly key: K;
  readonly value: UnpackArray<Config[K]>;
}

/**
 * Adds an element to an iterable configuration property.
 */
export function addConfigIndex<K extends ConfigArrayKeys>(
  key: K,
  value: UnpackArray<Config[K]>,
): AddConfigIndexAction<K> {
  return {
    type: 'ADD_CONFIG_INDEX',
    key,
    value,
  };
}

export interface UpdateConfigIndexAction<K extends ConfigArrayKeys> {
  readonly type: 'UPDATE_CONFIG_INDEX';
  readonly key: K;
  readonly value: UnpackArray<Config[K]>;
  readonly index: number;
}

/**
 * Updates an element from an iterable configuration property.
 */
export function updateConfigIndex<K extends ConfigArrayKeys>(
  key: K,
  index: number,
  value: UnpackArray<Config[K]>,
): UpdateConfigIndexAction<K> {
  return {
    type: 'UPDATE_CONFIG_INDEX',
    key,
    index,
    value,
  };
}

export interface RemoveConfigIndex {
  readonly type: 'REMOVE_CONFIG_INDEX';
  readonly key: ConfigArrayKeys;
  readonly index: number;
}

/**
 * Removes an element from an iterable configuration property.
 */
export function removeConfigIndex(key: ConfigArrayKeys, index: number): RemoveConfigIndex {
  return {
    type: 'REMOVE_CONFIG_INDEX',
    key,
    index,
  };
}
