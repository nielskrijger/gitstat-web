import React, { ReactElement } from 'react';
import H1 from '../../components/H1';
import H2 from '../../components/H2';

export default (): ReactElement => (
  <>
    <H1>About GitStat</H1>
    <p>
      This is a hobby project. Feel free to share ideas or report bugs on{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/nielskrijger/gitstat-web"
      >
        github
      </a>
      .
    </p>

    <H2>Credits</H2>
    <ul>
      <li>
        Web framework{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org">
          react
        </a>
      </li>
      <li>
        Chart library{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://www.chartjs.org">
          chart.js
        </a>
      </li>
      <li>
        The excellent{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://react-select.com/">
          react-select
        </a>{' '}
        library
      </li>
      <li>
        The logo &quot;graph-poly&quot;-icon from{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://webkul.github.io/vivid/">
          vivid icons
        </a>
      </li>
    </ul>
  </>
);
