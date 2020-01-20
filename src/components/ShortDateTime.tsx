import React, { FC, ReactElement } from 'react';
import { DateTime } from 'luxon';

interface ShortDateTimeProps {
  readonly time: string;
}

const ShortDateTime: FC<ShortDateTimeProps> = ({ time }): ReactElement => {
  const dt = DateTime.fromISO(time);
  return <span>{dt.toFormat('ff')}</span>;
};

export default ShortDateTime;
