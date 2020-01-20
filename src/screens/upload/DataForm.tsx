import React, { FC, ReactElement } from 'react';
import H2 from '../../components/H2';
import UploadDragAndDrop from './UploadDragAndDrop';
import UploadInstructions from './UploadInstructions';

const DataForm: FC = (): ReactElement => {
  return (
    <>
      <H2>Upload GIT history</H2>
      <UploadInstructions />
      <UploadDragAndDrop />
    </>
  );
};

export default DataForm;
