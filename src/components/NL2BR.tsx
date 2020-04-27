import React, { Fragment, ReactElement } from 'react';

interface Props {
  readonly text: string;
}

export default ({ text }: Props): ReactElement => (
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
