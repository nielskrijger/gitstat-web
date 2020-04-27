import { TimeUnit } from 'chart.js';
import React, { ReactElement } from 'react';
import Number from '../../components/Number';
import { AggregatedCommitGroup } from '../../types/commits';

interface Props {
  groups: AggregatedCommitGroup[];
  timeUnit: TimeUnit;
  others: string[];
}

export default ({ groups, timeUnit, others }: Props): ReactElement => (
  <table>
    <thead>
      <tr>
        <th style={{ textAlign: 'left' }}>Name</th>
        <th style={{ textAlign: 'right' }}>Total</th>
        <th style={{ textAlign: 'right' }}>Average per {timeUnit}</th>
      </tr>
    </thead>
    <tbody>
      {groups.map((group) => (
        <tr key={group.name}>
          <td>
            {group.name}
            {others.includes(group.name) && <small> (others)</small>}
          </td>
          <td style={{ textAlign: 'right' }}>
            <Number value={group.aggregate} />
          </td>
          <td style={{ textAlign: 'right' }}>
            <Number value={group.average} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
