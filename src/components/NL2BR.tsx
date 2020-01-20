import React, { FC, Fragment, ReactElement } from 'react';

interface NL2BRProps {
  readonly text: string;
}

const NL2BR: FC<NL2BRProps> = ({ text }): ReactElement => (
  <>
    {text.split('\n').map(
      (item, key): ReactElement => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={key}>
          {item}
          <br />
        </Fragment>
      ),
    )}
  </>
);

export default NL2BR;
