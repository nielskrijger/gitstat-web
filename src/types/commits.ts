import { ColoredElement } from './coloredElement';
import { ExcludeFilter } from './filters';
import { Commit, CommitFile } from './gitStatData';

export interface CommitMutations {
  additions: number;
  deletions: number;

  // rawAdditions is the number of lines added before applying any filters
  rawAdditions: number;

  // rawDeletions is the number of lines deleted before applying any filters
  rawDeletions: number;
}

export interface ExtendedCommit extends Commit, CommitMutations, ExcludeFilter {
  project: string;
  extendedFiles: ExtendedCommitFile[];
}

export type ExtendedCommitFile = CommitFile & ExcludeFilter;

export type CommitAggregationFn = (commit: ExtendedCommit) => number;

export type CommitFilterFn = (commit: ExtendedCommit) => boolean;

export interface CommitGroup {
  group: string;
  commits: ExtendedCommit[];
}

export interface Aggregate {
  aggregate: number;
  average: number;
}

export type ColoredCommitGroup = CommitGroup & ColoredElement;

export type AggregatedCommitGroup = CommitGroup & Aggregate;

export type ExtendedCommitGroup = ColoredCommitGroup & AggregatedCommitGroup;
