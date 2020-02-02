import { Config } from '../stores/config/configTypes';
import { CommitMutations, ExtendedCommitFile } from '../types/commits';
import { Commit } from '../types/gitStatData';

/**
 * Sets the `excluded`-value on commit files based on a given configuration
 * and filters out any files that are renamed.
 *
 * Exclusion file filters override inclusion file filters.
 */
export const getExtendedFiles = (
  commit: Commit,
  commitExcluded: boolean,
  config: Config,
): ExtendedCommitFile[] => {
  const includeFileFilters = config.includeFileFilters
    .filter(value => !!value)
    .map(value => new RegExp(value));
  const excludeFileFilters = config.excludeFileFilters
    .filter(value => !!value)
    .map(value => new RegExp(value));

  return commit.files
    .filter(file => typeof file.renameTo === 'undefined') // Rename origin files can be ignored completely
    .map(
      (file): ExtendedCommitFile => {
        let excluded = commitExcluded;

        if (!excluded) {
          excluded = excludeFileFilters.some((excludeFilter): boolean =>
            excludeFilter.test(file.filepath),
          );
        }

        if (!excluded) {
          excluded = !includeFileFilters.some((includeFilter): boolean =>
            includeFilter.test(file.filepath),
          );
        }

        if (!excluded) {
          excluded = file.similarity === 100;
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
export const calculateTotalMutations = (
  files: ExtendedCommitFile[],
  commitExcluded: boolean,
): CommitMutations => {
  return files.reduce(
    (acc, file: ExtendedCommitFile): CommitMutations => {
      if (!file.isBinary) {
        if (!file.excluded && !commitExcluded) {
          acc.additions += file.additions;
          acc.deletions += file.deletions;
        }
        acc.rawAdditions += file.rawAdditions;
        acc.rawDeletions += file.rawDeletions;
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
