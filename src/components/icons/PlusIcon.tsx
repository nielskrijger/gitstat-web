import React, { ReactElement } from 'react';
import MergeSVG from '../../../assets/icons/plus.svg';
import Icon from './Icon';

export default (): ReactElement => (
  <Icon style={{ marginRight: '0.3rem' }}>
    <MergeSVG />
  </Icon>
);
