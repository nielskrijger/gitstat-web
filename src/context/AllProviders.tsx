import React, { FC, ReactElement } from 'react';
import { GitDataProvider } from './GitDataProvider';
import { ConfigProvider } from './ConfigProvider';

const AllProviders: FC = ({ children }): ReactElement => (
  <GitDataProvider>
    <ConfigProvider>{children}</ConfigProvider>
  </GitDataProvider>
);

export default AllProviders;
