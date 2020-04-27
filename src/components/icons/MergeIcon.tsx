import React, { ReactElement } from 'react';
import MergeSVG from '../../../assets/icons/merge.svg';
import Icon from './Icon';

export default (): ReactElement => (
  <Icon style={{ marginRight: '0.1rem', display: 'inline-block' }}>
    <MergeSVG />
  </Icon>
);
