import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useExtendedCommits } from '../hooks/useExtendedCommits';
import {
  AggregatedCommitGroup,
  CommitAggregationFn,
  CommitFilterFn,
  CommitGroup,
  ExtendedCommit,
} from '../types/commits';

export enum OrderByType {
  TIME = 'time',
  MUTATIONS = 'mutations',
  ADDITIONS = 'additions',
  DELETIONS = 'deletions',
}

function orderByValue(orderBy?: OrderByType) {
  return (commit: ExtendedCommit): string | number => {
    switch (orderBy) {
      case OrderByType.ADDITIONS:
        return commit.additions;
      case OrderByType.DELETIONS:
        return commit.deletions;
      case OrderByType.MUTATIONS:
        return Math.abs(commit.deletions) + commit.additions;
      case OrderByType.TIME:
      default:
        return commit.committer.time;
    }
  };
}

/**
 * Returns a list of commits ordered by the specified order function.
 *
 * Returns null if no commits were found.
 */
export function useSortedCommits(orderBy?: OrderByType): ExtendedCommit[] {
  const extendedCommits = useExtendedCommits();
  return useMemo((): ExtendedCommit[] => {
    const orderValueFn = orderByValue(orderBy);
    const commits = [...extendedCommits]; // Don't reverse on original memo'd array
    commits.sort((a, b) => (orderValueFn(a) > orderValueFn(b) ? -1 : 1));
    return commits;
  }, [extendedCommits, orderBy]);
}

/**
 * Returns the timestamp of the first commit. Returns today if no commits were found.
 */
export function useFirstCommitTimestamp(): Date | null {
  const commits = useExtendedCommits();
  return useMemo(() => {
    if (commits.length > 0) {
      return DateTime.fromISO(commits[0].committer.time).toJSDate();
    }
    return null;
  }, [commits]);
}

/**
 * Filters a list of commits using a collection of filter functions. Retursn only
 * commits that pass all filters.
 */
function filterCommits(
  commits: ExtendedCommit[],
  ...filterFns: CommitFilterFn[]
): ExtendedCommit[] {
  return commits.filter(commit => filterFns.every(filterFn => filterFn(commit)));
}

/**
 * Returns commits filtered by their start and end date.
 */
export const filterCommitsByDate = (
  commits: ExtendedCommit[],
  startDate?: Date,
  endDate?: Date,
): ExtendedCommit[] => {
  const endDateFilter = (commit: ExtendedCommit): boolean =>
    endDate ? DateTime.fromISO(commit.committer.time) <= DateTime.fromJSDate(endDate) : true;
  const startDateFilter = (commit: ExtendedCommit): boolean =>
    startDate ? DateTime.fromISO(commit.committer.time) >= DateTime.fromJSDate(startDate) : true;
  return filterCommits(commits, startDateFilter, endDateFilter);
};

export enum GroupByType {
  PROJECT = 'project',
  AUTHOR = 'author',
  FILETYPE = 'filetype',
}

/**
 * Groups commits using a groupBy function and sets when the first and last commit
 * of that name occurred.
 */
export const groupCommits = (commits: ExtendedCommit[], groupBy: GroupByType): CommitGroup[] => {
  const groupFn = groupByFunction(groupBy);
  const groups: CommitGroup[] = [];
  if (commits) {
    commits.forEach((originalCommit: ExtendedCommit): void => {
      groupFn(originalCommit).forEach(({ name, commit }) => {
        let group = groups.find(elm => elm.name === name);

        // If name doesn't exist add a new one
        if (!group) {
          group = {
            name,
            commits: [],
            firstCommit: DateTime.fromISO(commit.author.time),
            lastCommit: DateTime.fromISO(commit.author.time),
          };
          groups.push(group);
        }

        // Add the commit to the name
        group.commits.push(commit);
        if (DateTime.fromISO(commit.author.time) < group.firstCommit) {
          group.firstCommit = DateTime.fromISO(commit.author.time);
        }
        if (DateTime.fromISO(commit.author.time) > group.lastCommit) {
          group.lastCommit = DateTime.fromISO(commit.author.time);
        }
      });
    });
  }
  groups.sort((a, b) => a.name.localeCompare(b.name));
  return groups;
};

const extensionRegex = /(?:\.([^.]+))?$/;

interface GroupedCommit {
  name: string;
  commit: ExtendedCommit;
}

function groupByFunction(groupBy: GroupByType) {
  return (commit: ExtendedCommit): GroupedCommit[] => {
    switch (groupBy) {
      case GroupByType.FILETYPE:
        // Create separate commits for each file extension.
        // TODO this is a bit nasty, try to find a cleaner model that
        //  automatically recomputes totals.
        return commit.extendedFiles.reduce((acc: GroupedCommit[], extendedFile) => {
          if (extendedFile.excluded) {
            return acc;
          }

          const split = extensionRegex.exec(extendedFile.filepath);
          const extension = split && split[1] ? `.${split[1]}` : 'none';

          let group = acc.find(elm => elm.name === extension);
          if (!group) {
            group = {
              name: extension,
              commit: {
                ...commit,
                extendedFiles: [],
                additions: 0,
                deletions: 0,
              },
            };
            acc.push(group);
          }
          group.commit.extendedFiles.push(extendedFile);
          group.commit.additions += extendedFile.additions;
          group.commit.deletions += extendedFile.deletions;
          return acc;
        }, []);
      case GroupByType.AUTHOR:
        return [
          {
            name: commit.author.name,
            commit,
          },
        ];
      case GroupByType.PROJECT:
      default:
        return [
          {
            name: commit.project,
            commit,
          },
        ];
    }
  };
}

const aggregate = (commits: ExtendedCommit[], aggregationFn: CommitAggregationFn): number =>
  commits.reduce((acc, commit: ExtendedCommit) => {
    return acc + aggregationFn(commit);
  }, 0);

/**
 * Applies an aggregation function on the CommitGroups and sorts them in
 * that order from highest to lowest.
 */
export const aggregateCommits = (
  groups: CommitGroup[],
  aggregationFn: CommitAggregationFn,
  periods: number,
): AggregatedCommitGroup[] => {
  const result = groups.map(group => ({
    ...group,
    aggregate: aggregate(group.commits, aggregationFn),
    average: aggregate(group.commits, aggregationFn) / periods,
  }));
  result.sort((a, b) => (a.aggregate > b.aggregate ? -1 : 1));
  return result;
};
