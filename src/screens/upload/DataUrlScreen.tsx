import React, { FC, ReactElement } from 'react';
import { Form } from 'react-final-form';
import H1 from '../../components/H1';
import Note from '../../components/Note';
import useRouter from '../../hooks/useRouter';
import DataUrlForm from './DataUrlForm';
import useDataUrlForm from './useDataUrlForm';

const DataUrlScreen: FC = (): ReactElement | null => {
  const { history } = useRouter();
  const { isSuccess, submitForm } = useDataUrlForm();

  if (isSuccess) {
    history.push('/graphs');
    return null;
  }

  return (
    <>
      <H1>Remote url</H1>
      <p>Alternatively, upload you datafile somewhere and post a link below.</p>
      <Form
        onSubmit={submitForm}
        initialValues={{
          url: '',
        }}
        render={DataUrlForm}
      />
      <Note>
        Note: upload to FTP, Dropbox, S3, Google Cloud, Azure or similar. Shareable links from
        Google Drive, and Office 365 don&apos;t work.
      </Note>
    </>
  );
};

export default DataUrlScreen;
