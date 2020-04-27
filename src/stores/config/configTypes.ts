import { KeysOfType } from '../../types/util';

export interface Aliases {
  readonly realName: string;
  readonly aliases: string[];
}

export interface Config {
  readonly includeMergeCommits: boolean;
  readonly includeFileFilters: string[];
  readonly excludeFileFilters: string[];
  readonly authorAliases: Aliases[];
  readonly excludeAuthors: string[];
  readonly excludeCommits: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigArrayKeys = KeysOfType<Config, Array<any>>;
