import { DateTime } from 'luxon';
import React, { FC, ReactElement } from 'react';

interface Props {
  readonly time: string;
}

const ShortDateTime: FC<Props> = ({ time }): ReactElement => {
  const dt = DateTime.fromISO(time);
  return <span>{dt.toFormat('ff')}</span>;
};

export default ShortDateTime;
