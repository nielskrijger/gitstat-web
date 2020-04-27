import { useMemo } from 'react';
import { Slice } from '../components/charts/PieChart';
import { ColoredCommitGroup, CommitAggregationFn, ExtendedCommit } from '../types/commits';

export function useSlices(
  commits: ColoredCommitGroup[],
  aggregationFn: CommitAggregationFn | null,
): Slice[] {
  return useMemo((): Slice[] => {
    if (!aggregationFn) {
      return [];
    }

    return commits.reduce((acc: Slice[], group: ColoredCommitGroup): Slice[] => {
      let slice = acc.find((elm) => elm.label === group.name);
      if (!slice) {
        slice = {
          label: group.name,
          value: 0,
          backgroundColor: group.backgroundColor,
          borderColor: group.borderColor,
        };
        acc.push(slice);
      }
      slice.value += group.commits.reduce(
        (sum, curr: ExtendedCommit): number => sum + aggregationFn(curr),
        0,
      );
      return acc;
    }, []);
  }, [commits, aggregationFn]);
}
