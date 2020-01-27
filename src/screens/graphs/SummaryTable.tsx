import { TimeUnit } from 'chart.js';
import React, { FC, ReactElement } from 'react';
import { AggregatedCommitGroup } from '../../types/commits';
import { formatNumber } from '../../utils/number';

interface SummaryTableProps {
  groups: AggregatedCommitGroup[];
  timeUnit: TimeUnit;
  others: string[];
}

const SummaryTable: FC<SummaryTableProps> = ({ groups, timeUnit, others }): ReactElement => (
  <table>
    <thead>
      <tr>
        <th style={{ textAlign: 'left' }}>Name</th>
        <th style={{ textAlign: 'right' }}>Total</th>
        <th style={{ textAlign: 'right' }}>Average per {timeUnit}</th>
      </tr>
    </thead>
    <tbody>
      {groups.map(group => (
        <tr key={group.name}>
          <td>
            {group.name}
            {others.includes(group.name) && <small> (others)</small>}
          </td>
          <td style={{ textAlign: 'right' }}>{formatNumber(group.aggregate)}</td>
          <td style={{ textAlign: 'right' }}>{formatNumber(group.average)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SummaryTable;
