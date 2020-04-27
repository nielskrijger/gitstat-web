import React, { ReactElement } from 'react';

interface Props {
  value: number;
  fractionDigits?: number;
}

export default ({ value, fractionDigits = 0 }: Props): ReactElement => {
  const result = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
  return <code>{result}</code>;
};
