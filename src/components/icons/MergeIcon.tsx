import React, { FC, ReactElement } from 'react';
import MergeSVG from '../../../assets/icons/merge.svg';
import Icon from './Icon';

const MergeIcon: FC = (): ReactElement => (
  <Icon style={{ marginRight: '0.1rem', display: 'inline-block' }}>
    <MergeSVG />
  </Icon>
);

export default MergeIcon;
