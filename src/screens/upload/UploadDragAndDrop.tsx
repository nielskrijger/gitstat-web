import { lighten } from 'polished';
import React, { FC, ReactElement, useCallback, useContext, useState } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { loadData } from '../../stores/data/dataActions';
import { GitDataStore } from '../../stores/data/GitDataProvider';
import { colors } from '../../styles/colors';
import { borderRadius, transitionDelay } from '../../styles/styles';
import { GitStatData } from '../../types/gitStatData';

const getColor = (props: DropzoneRootProps): string => {
  if (props.isDragAccept) {
    return colors.success;
  }
  if (props.isDragReject) {
    return colors.error;
  }
  if (props.isDragActive) {
    return colors.primary;
  }
  return colors.border;
};

const Container = styled.div<DropzoneRootProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  cursor: pointer;
  margin: 0 0;
  border-width: 1px;
  border-style: dashed;
  border-color: ${(props: DropzoneRootProps): string => getColor(props)};
  border-radius: ${borderRadius};
  background-color: ${colors.inputBackground};
  color: ${colors.textSecondary};
  outline: none;
  transition: all ${transitionDelay}ms ease-in-out;

  &:hover {
    background-color: ${lighten(0.01, colors.background)};
    border-color: ${colors.inputBorderHover};
    color: ${colors.text};
  }
`;

const UploadDragAndDrop: FC = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(GitDataStore);
  const history = useHistory();

  const onDrop = useCallback(
    (acceptedFiles): void => {
      setLoading(true);

      // Process the files within a timeout to allow rerendering to take place
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (): void => {
          const text = String(reader.result);
          const data = JSON.parse(text) as GitStatData;
          dispatch(loadData(data));
          history.push('/graphs');
        };
        reader.readAsText(acceptedFiles[0]);
      }, 200);
    },
    [dispatch, history, setLoading],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'application/json',
  });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      {loading && <Loader />}
      {!loading && (
        <>
          <input {...getInputProps()} />
          <p style={{ textAlign: 'center' }}>
            Drag &apos;n&apos; drop your JSON file here, or click to select one
          </p>
        </>
      )}
    </Container>
  );
};

export default UploadDragAndDrop;
