import React, { FC, ReactElement } from 'react';
import { ExtendedCommitGroup } from '../../types/commits';
import { formatNumber } from '../../utils/number';

interface SummaryTableProps {
  groups: ExtendedCommitGroup[];
  others: string[];
}

const SummaryTable: FC<SummaryTableProps> = ({ groups, others }): ReactElement => (
  <table>
    <thead>
      <tr>
        <th style={{ textAlign: 'left' }}>Name</th>
        <th style={{ textAlign: 'right' }}>Total</th>
        <th style={{ textAlign: 'right' }}>Avg</th>
      </tr>
    </thead>
    <tbody>
      {groups.map(({ group, aggregate, average }) => (
        <tr key={group}>
          <td>
            {group}
            {others.includes(group) && <small> (others)</small>}
          </td>
          <td style={{ textAlign: 'right' }}>{formatNumber(aggregate)}</td>
          <td style={{ textAlign: 'right' }}>{formatNumber(average)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SummaryTable;
