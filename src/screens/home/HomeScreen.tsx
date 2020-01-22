import React, { FC, ReactElement } from 'react';
import H1 from '../../components/H1';
import PageLayout from '../../layouts/PageLayout';
import DataForm from '../upload/DataForm';

const HomeScreen: FC = (): ReactElement => (
  <PageLayout>
    <H1>Git stats & graphs</H1>
    <p>Visualize your project&apos;s git history.</p>
    <DataForm />
    <p>
      This datafile is never stored! If you reopen or refresh this website you&apos;ll have to
      supply the same file again.
    </p>
  </PageLayout>
);

export default HomeScreen;
