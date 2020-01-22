import { Config } from '../stores/config/configTypes';
import { CommitMutations, ExtendedCommitFile } from '../types/commits';
import { Commit } from '../types/gitStatData';

/**
 * Sets the `excluded`-value on commit files based on a given configuration.
 *
 * Exclusion file filters override inclusion file filters.
 */
export const extendedFiles = (commit: Commit, config: Config): ExtendedCommitFile[] => {
  const includeFileFilters = config.includeFileFilters.map(value => new RegExp(value));
  const excludeFileFilters = config.excludeFileFilters.map(value => new RegExp(value));
  return commit.files.map(
    (file): ExtendedCommitFile => {
      let excluded = excludeFileFilters.some((excludeFilter): boolean =>
        excludeFilter.test(file.filepath),
      );
      if (!excluded) {
        excluded = !includeFileFilters.some((includeFilter): boolean =>
          includeFilter.test(file.filepath),
        );
      }
      return {
        ...file,
        excluded,
      };
    },
  );
};

/**
 * Calculates the addition/deletion statistics for a set of commit files.
 *
 * Should be run after applying any inclusion/exclusion file filters.
 */
export const totalCommitMutations = (files: ExtendedCommitFile[]): CommitMutations => {
  return files.reduce(
    (acc, file: ExtendedCommitFile): CommitMutations => {
      if (!file.isBinary) {
        if (!file.excluded) {
          acc.additions += file.additions;
          acc.deletions += file.deletions;
        }
        acc.rawAdditions += file.additions;
        acc.rawDeletions += file.deletions;
      }
      return acc;
    },
    {
      additions: 0,
      deletions: 0,
      rawAdditions: 0,
      rawDeletions: 0,
    },
  );
};
