import React, { FC, Fragment, ReactElement } from 'react';

interface NL2BRProps {
  readonly text: string;
}

const NL2BR: FC<NL2BRProps> = ({ text }): ReactElement => (
  <>
    {text.split('\n').map(
      (item, key): ReactElement => (
        <Fragment key={key}>
          {item}
          <br />
        </Fragment>
      ),
    )}
  </>
);

export default NL2BR;
