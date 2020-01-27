import { DateTime, DurationUnit } from 'luxon';
import { useMemo } from 'react';
import { ChartData, Line } from '../components/charts/LineChart';
import { ColoredCommitGroup, CommitAggregationFn, ExtendedCommit } from '../types/commits';

// Above this threshold lines are grouped into "Others".
const MAX_DATA_POINTS = 2000;

interface LinesView {
  lines: Line[];
  others: string[];
  hasNegatives: boolean;
}

/**
 * Returns line data for a chart.js linegraph. Assumes commit groups
 * are ordered from hieghest to lowest
 */
export function useLines(
  groups: ColoredCommitGroup[],
  aggregationFn: CommitAggregationFn | null,
  timeUnit?: DurationUnit,
  start?: Date,
  end?: Date,
): LinesView {
  return useMemo((): LinesView => {
    if (!(aggregationFn && start && end && timeUnit)) {
      return {
        lines: [],
        others: [],
        hasNegatives: false,
      };
    }

    const startDate = DateTime.fromJSDate(start);
    const endDate = DateTime.fromJSDate(end);
    const lineData = generateLineData(groups, aggregationFn, timeUnit, startDate, endDate);

    const result = hideTooManyDataPoints(lineData, timeUnit, startDate, endDate);
    return {
      ...result,
      hasNegatives: result.lines.some(line => line.data.some((value): boolean => value.y < 0)),
    };
  }, [groups, timeUnit, start, end, aggregationFn]);
}

/**
 * Generates the line chartdata for a given period. Zerofills any
 * dates for which no data is available.
 */
function generateLineData(
  groups: ColoredCommitGroup[],
  aggregationFn: CommitAggregationFn,
  timeUnit: DurationUnit,
  startDate: DateTime,
  endDate: DateTime,
): Line[] {
  return groups.map(
    (group): Line => {
      const zeroFilled = zeroFillChartData(startDate, endDate, timeUnit);

      group.commits.forEach((commit: ExtendedCommit): void => {
        const beginOf = DateTime.fromISO(commit.committer.time)
          .startOf(timeUnit)
          .toJSDate();

        const item = zeroFilled.find((elm): boolean => elm.x.getTime() === beginOf.getTime());
        item!.y += aggregationFn(commit); // item always exists because we zerofilled the whole period
      });

      return {
        label: group.name,
        data: zeroFilled,
        borderColor: group.borderColor,
        backgroundColor: group.backgroundColor,
      };
    },
  );
}

/**
 * If there are too many datapoints performance will suffer, particularly
 * for the Chart.js hover animation. Group all lines into a single "Others"-line until
 * we're below the max datapoint threshold.
 */
function hideTooManyDataPoints(
  lines: Line[],
  timeUnit: DurationUnit,
  startDate: DateTime,
  endDate: DateTime,
): Pick<LinesView, 'lines' | 'others'> {
  let nrOfDataPoints = lines.reduce((acc, data) => acc + data.data.length, 0);
  const others: string[] = [];
  if (lines.length > 1 && nrOfDataPoints > MAX_DATA_POINTS) {
    const zeroFilled = zeroFillChartData(startDate, endDate, timeUnit);

    let removedLine;
    do {
      // eslint-disable-next-line prefer-destructuring
      removedLine = lines.splice(-1, 1)[0];
      nrOfDataPoints -= removedLine.data.length;
      others.push(removedLine.label);
      removedLine.data.forEach(chartData => {
        const item = zeroFilled.find((elm): boolean => elm.x.getTime() === chartData.x.getTime());
        item!.y += chartData.y; // item always exists because we zerofilled the whole period
      });
    } while (nrOfDataPoints > MAX_DATA_POINTS && lines.length > 0);

    // Add "Others" line as the last line in the dataset.
    // It copies the colors from the last line that was removed.
    lines.push({
      label: 'Others',
      data: zeroFilled,
      backgroundColor: removedLine.backgroundColor,
      borderColor: removedLine.borderColor,
    });
  }
  return { lines, others };
}

/**
 * Returns an array of chart data with time periods between the first
 * and last period with y-value 0.
 */
function zeroFillChartData(start: DateTime, end: DateTime, timeUnit: DurationUnit): ChartData[] {
  let period = start.startOf(timeUnit);
  const result: ChartData[] = [];
  do {
    result.push({ x: period.toJSDate(), y: 0 });
    period = period.plus({ [timeUnit]: 1 });
  } while (period <= end.startOf(timeUnit));
  return result;
}
