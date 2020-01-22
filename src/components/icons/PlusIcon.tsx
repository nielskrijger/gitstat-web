import React, { FC, ReactElement } from 'react';
import MergeSVG from '../../../assets/icons/plus.svg';
import Icon from './Icon';

const PlusIcon: FC = (): ReactElement => (
  <Icon>
    <MergeSVG />
  </Icon>
);

export default PlusIcon;
