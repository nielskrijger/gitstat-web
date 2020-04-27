import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import H1 from '../../components/H1';
import NoWrap from '../../components/NoWrap';
import MessageLayout from '../../layouts/MessageLayout';

export default (): ReactElement => (
  <MessageLayout>
    <H1>404 Not Found</H1>
    <p>The requested URL was not found</p>
    <p>
      Try refreshing the page or go{' '}
      <NoWrap>
        <Link to="/">back to home</Link>
      </NoWrap>
      .
    </p>
  </MessageLayout>
);
