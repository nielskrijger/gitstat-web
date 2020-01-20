import { useMemo } from 'react';
import { CommitAggregationFn, ExtendedCommit } from '../types/commits';

export enum AggregationFnType {
  COMMITS = 'commits',
  MUTATIONS = 'mutations',
  DIFF = 'difference',
  ADDITIONS = 'additions',
  DELETIONS = 'deletions',
}

export function useAggregationFn(aggregation: AggregationFnType): CommitAggregationFn {
  return useMemo((): CommitAggregationFn => {
    switch (aggregation) {
      case AggregationFnType.MUTATIONS:
        return (commit: ExtendedCommit): number => commit.additions + commit.deletions;
      case AggregationFnType.DIFF:
        return (commit: ExtendedCommit): number => commit.additions - commit.deletions;
      case AggregationFnType.ADDITIONS:
        return (commit: ExtendedCommit): number => commit.additions;
      case AggregationFnType.DELETIONS:
        return (commit: ExtendedCommit): number => commit.deletions;
      case AggregationFnType.COMMITS:
      default:
        return (): number => 1;
    }
  }, [aggregation]);
}
