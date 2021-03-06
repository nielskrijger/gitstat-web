import { TimeUnit } from 'chart.js';
import React, { ReactElement, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import LineChart from '../../components/charts/LineChart';
import PieChart from '../../components/charts/PieChart';
import ControlsBar from '../../components/ControlsBar';
import DatePicker from '../../components/form/DatePicker';
import H1 from '../../components/H1';
import { AggregationFnType, useAggregationFn } from '../../hooks/useAggregationFn';
import { useExtendedCommits } from '../../hooks/useExtendedCommits';
import { useLines } from '../../hooks/useLines';
import { useSlices } from '../../hooks/useSlices';
import { useStoredDate, useStoredState } from '../../hooks/useStateWithSessionStorage';
import {
  aggregateCommits,
  filterCommitsByDate,
  GroupByType,
  groupCommits,
  useFirstCommitTimestamp,
} from '../../selectors/commits';
import { ColoredElement } from '../../types/coloredElement';
import { AggregatedCommitGroup } from '../../types/commits';
import colorize from '../../utils/colorize';
import { periodCount } from '../../utils/time';
import SelectAggregationFn from './SelectAggregationFn';
import SelectGroupBy from './SelectGroupBy';
import SelectTimeUnit, { timeUnitOptions } from './SelectTimeUnit';
import SummaryTable from './SummaryTable';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  grid-gap: 2rem;
  margin-top: 0.5rem;
`;

/**
 * Returns the time unit that is closest to a specified number of periods
 * between a given start & end date without exceeding it.
 */
const determineInitialTimeUnit = (startDate: Date, endDate: Date, maxPeriods = 100): TimeUnit => {
  let i = 0;
  let initialTimeUnit = timeUnitOptions[i].value;
  while (
    periodCount(startDate, endDate, initialTimeUnit) > maxPeriods &&
    i < timeUnitOptions.length - 1
  ) {
    i++;
    initialTimeUnit = timeUnitOptions[i].value;
  }
  return initialTimeUnit;
};

export default (): ReactElement => {
  const now = new Date();
  const [timeUnit, setTimeUnit] = useStoredState<TimeUnit>('graphs:timeunit', 'day');
  const [groupBy, setGroupBy] = useStoredState<GroupByType>('graphs:groupby', GroupByType.AUTHOR);
  const [startDate, setStartDate] = useStoredDate('graphs:startdate', now);
  const [endDate, setEndDate] = useStoredDate('graphs:enddate', now);
  const [aggregateFnName, setAggregateFnName] = useStoredState(
    'graphs:aggregate',
    AggregationFnType.COMMITS,
  );
  const aggregationFn = useAggregationFn(aggregateFnName);

  // Set initial values
  const minDate = useFirstCommitTimestamp();
  useEffect(() => {
    if (minDate && startDate === now) {
      setStartDate(minDate);
      setTimeUnit(determineInitialTimeUnit(minDate, endDate));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Group commits and apply any date filters
  const commits = useExtendedCommits();
  const groupedCommits = useMemo(() => {
    const filteredByDate = filterCommitsByDate(commits, startDate, endDate);
    return groupCommits(filteredByDate, groupBy);
  }, [commits, startDate, endDate, groupBy]);

  // Add aggregation stats and colorize the groups
  const periods = periodCount(startDate, endDate, timeUnit);
  const aggregatedCommitGroups = useMemo((): AggregatedCommitGroup[] => {
    return aggregateCommits(groupedCommits, aggregationFn, periods);
  }, [groupedCommits, aggregationFn, periods]);

  // Colorize groups
  const colorizedChartData = useMemo((): (AggregatedCommitGroup & ColoredElement)[] => {
    return colorize(aggregatedCommitGroups);
  }, [aggregatedCommitGroups]);

  // Generate line data
  const { lines, others, hasNegatives } = useLines(
    colorizedChartData,
    aggregationFn,
    timeUnit,
    startDate,
    endDate,
  );
  const slices = useSlices(colorizedChartData, aggregationFn);

  return (
    <>
      <H1>Graphs</H1>
      <ControlsBar>
        <SelectAggregationFn value={aggregateFnName} onChange={setAggregateFnName} />
        <SelectGroupBy value={groupBy} onChange={setGroupBy} />
        <SelectTimeUnit value={timeUnit} onChange={setTimeUnit} />
        <DatePicker value={startDate} onChange={setStartDate} />
        <div style={{ fontSize: '1.3em' }}>/</div>
        <DatePicker value={endDate} onChange={setEndDate} todayButton />
      </ControlsBar>
      <GridContainer>
        <LineChart
          lines={lines}
          timeUnit={timeUnit}
          stacked={!hasNegatives /* Stacked graph doesn't render correctly with negative values */}
          style={{ height: '30rem', gridColumn: '1 / -1' }}
        />

        <PieChart slices={slices} style={{ height: '30rem' }} />

        <SummaryTable groups={aggregatedCommitGroups} timeUnit={timeUnit} others={others} />
      </GridContainer>
    </>
  );
};
