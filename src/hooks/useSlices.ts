import { useMemo } from 'react';
import { Slice } from '../components/charts/PieChart';
import { CommitAggregationFn, ExtendedCommit, ExtendedCommitGroup } from '../types/commits';

export function useSlices(
  commits: ExtendedCommitGroup[],
  aggregationFn: CommitAggregationFn | null,
): Slice[] {
  return useMemo((): Slice[] => {
    if (!aggregationFn) {
      return [];
    }

    return commits.reduce((acc: Slice[], current: ExtendedCommitGroup): Slice[] => {
      let slice = acc.find(elm => elm.label === current.group);
      if (!slice) {
        slice = {
          label: current.group,
          value: 0,
          backgroundColor: current.backgroundColor,
          borderColor: current.borderColor,
        };
        acc.push(slice);
      }
      slice.value += current.commits.reduce(
        (sum, curr: ExtendedCommit): number => sum + aggregationFn(curr),
        0,
      );
      return acc;
    }, []);
  }, [commits, aggregationFn]);
}
