import React, { FC, ReactElement } from 'react';
import H1 from '../../components/H1';
import H2 from '../../components/H2';

const AboutScreen: FC = (): ReactElement => (
  <>
    <H1>GitStat</H1>
    <p>
      This is a hobby project. Feel free to share ideas or report bugs on{' '}
      <a href="https://github.com/nielskrijger/gitstat-web">github</a>.
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
        Logo graph-poly icon from{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://webkul.github.io/vivid/">
          vivid icons
        </a>
      </li>
      <li>
        From{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://thenounproject.com">
          The Noun Project
        </a>
        :
        <ul>
          <li>commit icon by Phạm Thanh Lộc</li>
          <li>Upload icon by Creative Stall</li>
          <li>about icon by MRK</li>
          <li>overview icon by Shiva</li>
          <li>Git Merge icon by icon 54</li>
          <li>person icon by Caitlin George</li>
          <li>collapse vertical icon by Omar Safaa</li>
          <li>line chart by Marie Van den Broeck</li>
        </ul>
      </li>
    </ul>
  </>
);

export default AboutScreen;
