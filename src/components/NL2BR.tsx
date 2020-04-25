import React, { FC, Fragment, ReactElement } from 'react';

interface Props {
  readonly text: string;
}

const NL2BR: FC<Props> = ({ text }): ReactElement => (
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
