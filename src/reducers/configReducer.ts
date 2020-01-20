export interface Config {
  readonly excludeMerges: boolean;
  readonly includeFileFilters: string[];
  readonly excludeFileFilters: string[];
  readonly authorAliases: Aliases[];
  readonly excludeAuthors: string[];
}

export interface ConfigMerge {
  readonly excludeMerges?: boolean;
  readonly includeFileFilters?: string[];
  readonly excludeFileFilters?: string[];
  readonly authorAliases?: Aliases[];
  readonly excludeAuthors?: string[];
}

export interface Aliases {
  readonly realName: string;
  readonly aliases: string[];
}

export const initialState = {
  excludeMerges: true,
  includeFileFilters: ['.*$'],
  excludeFileFilters: [],
  authorAliases: [],
  excludeAuthors: [],
};

interface MergeConfig {
  readonly type: 'MERGE_CONFIG';
  readonly options: ConfigMerge;
}

export type Actions = MergeConfig;

const reducer = (state: Config, action: Actions): Config => {
  switch (action.type) {
    case 'MERGE_CONFIG':
      return {
        ...state,
        ...action.options,
      };
    default:
      return state;
  }
};

export default reducer;
