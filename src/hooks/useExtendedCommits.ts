import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { findRealName } from '../selectors/authors';
import { calculateTotalMutations, getExtendedFiles } from '../selectors/files';
import { useConfig } from '../stores/config/ConfigProvider';
import { useGitData } from '../stores/data/GitDataProvider';
import { ExtendedCommit } from '../types/commits';
import { Commit, Project } from '../types/gitStatData';

/**
 * Splits string a number of times and returns the remainder as a the last element of the array.
 */
function splitRemainder(str: string, separator: string, limit: number): string[] {
  const pieces = str.split(separator);
  if (pieces.length > limit) {
    const rest = pieces.splice(0, limit);
    rest.push(pieces.join(separator));
    return rest;
  }
  return pieces;
}

/**
 * Adds additional properties to the default gitstat dataset.
 * Returns an array of extended commits ordered by their commit timestamp.
 */
export function useExtendedCommits(): ExtendedCommit[] {
  const { data } = useGitData();
  const { config } = useConfig();

  return useMemo((): ExtendedCommit[] => {
    const extendedCommits: ExtendedCommit[] = [];
    if (data) {
      data.projects.forEach((project: Project): void => {
        project.commits.forEach((commit: Commit): void => {
          const author = findRealName(commit.author, config);
          if (config.excludeAuthors && config.excludeAuthors.includes(author.name)) {
            return;
          }

          let excluded = config.excludeCommits.includes(commit.hash);
          if (!excluded) {
            excluded = !config.includeMergeCommits && commit.isMerge;
          }

          const extendedFiles = getExtendedFiles(commit, excluded, config);
          const commitMutations = calculateTotalMutations(extendedFiles, excluded);
          const [title, description] = splitRemainder(commit.message, '\n', 1);
          extendedCommits.push({
            ...commit,
            project: project.name,
            title: title?.trim() || '',
            description: description?.trim() || '',
            author,
            committer: findRealName(commit.committer, config),
            extendedFiles: extendedFiles,
            ...commitMutations,
            excluded: commitMutations.deletions === 0 && commitMutations.additions === 0,
          });
        });
      });
    }
    extendedCommits.sort(sortCommitsByTime);
    return extendedCommits;
  }, [data, config]);
}

function sortCommitsByTime(a: ExtendedCommit, b: ExtendedCommit): number {
  return DateTime.fromISO(a.committer.time) < DateTime.fromISO(b.committer.time) ? -1 : 1;
}
