import { DateTime } from 'luxon';
import { transparentize } from 'polished';
import { useMemo } from 'react';
import { useExtendedCommits } from '../hooks/useExtendedCommits';
import {
  AggregatedCommitGroup,
  ColoredCommitGroup,
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
}

const COLORS = [
  '#FF4136',
  '#0074D9',
  '#2ECC40',
  '#FF851B',
  '#7FDBFF',
  '#B10DC9',
  '#FFDC00',
  '#39CCCC',
  '#01FF70',
  '#85144b',
  '#F012BE',
];
const DARKEN_BACKGROUND = 0.8;

/**
 * Groups commits using a groupBy function.
 */
export const groupCommits = (commits: ExtendedCommit[], groupBy: GroupByType): CommitGroup[] => {
  const groupFn = groupByFunction(groupBy);
  const groupedCommits: CommitGroup[] = [];
  if (commits) {
    commits.forEach((commit: ExtendedCommit): void => {
      const groupValue = groupFn(commit);
      let group = groupedCommits.find(elm => elm.group === groupValue);

      // If group doesn't exist add a new one
      if (!group) {
        group = {
          group: groupValue,
          commits: [],
        };
        groupedCommits.push(group);
      }

      // Add the commit to the group
      group.commits.push(commit);
    });
  }
  groupedCommits.sort((a, b) => a.group.localeCompare(b.group));
  return groupedCommits;
};

function groupByFunction(groupBy: GroupByType) {
  return (commit: ExtendedCommit): string => {
    switch (groupBy) {
      case GroupByType.AUTHOR:
        return commit.author.name;
      case GroupByType.PROJECT:
      default:
        return commit.project;
    }
  };
}

const aggregate = (commits: ExtendedCommit[], aggregationFn: CommitAggregationFn): number =>
  commits.reduce((acc, commit: ExtendedCommit) => acc + aggregationFn(commit), 0);

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

/**
 * Adds colors to the CommitGroup. If there are more than 10 groups
 * it's recommended to assign colors after the groups are sorted from most
 * significant to least significant, that way it's unlikely the same color
 * will appear in adjacent lines/bars/slices within your graph.
 */
export const colorizeGroups = (groups: CommitGroup[]): ColoredCommitGroup[] => {
  let colorIndex = 0;
  return groups.map(group => {
    const color = COLORS[colorIndex % COLORS.length];
    colorIndex += 1;
    return {
      ...group,
      borderColor: color,
      backgroundColor: transparentize(DARKEN_BACKGROUND, color),
    };
  });
};
