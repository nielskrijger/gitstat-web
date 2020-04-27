import React, { FC, ReactElement } from 'react';
import ConfigProvider from './config/ConfigProvider';
import GitDataProvider from './data/GitDataProvider';

const Stores: FC = ({ children }): ReactElement => (
  <GitDataProvider>
    <ConfigProvider>{children}</ConfigProvider>
  </GitDataProvider>
);

export default Stores;
