import { DateTime } from 'luxon';
import React, { ReactElement } from 'react';

interface Props {
  readonly time: string;
}

export default ({ time }: Props): ReactElement => {
  const dt = DateTime.fromISO(time);
  return <span>{dt.toFormat('ff')}</span>;
};
