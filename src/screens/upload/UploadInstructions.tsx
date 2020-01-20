import React, { FC, ReactElement } from 'react';

const UploadInstructions: FC = (): ReactElement => (
  <ol>
    <li>
      Generate a JSON file of your git repo(s) using{' '}
      <a href="https://github.com/nielskrijger/gitstat" target="_blank" rel="noopener noreferrer">
        gitstat
      </a>
      .
    </li>
    <li>Drop the JSON file below.</li>
  </ol>
);

export default UploadInstructions;
