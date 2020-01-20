import { lighten } from 'polished';
import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GitDataStore } from '../../context/GitDataProvider';
import { colors } from '../../styles/colors';
import { GitStatData } from '../../types/gitStatData';

const getColor = (props: DropzoneRootProps): string => {
  if (props.isDragAccept) {
    return colors.success;
  }
  if (props.isDragReject) {
    return colors.error;
  }
  if (props.isDragActive) {
    return colors.link;
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
  background-color: ${colors.black};
  color: ${colors.textSecondary};
  outline: none;
  transition: border 0.24s ease-in-out;

  &:hover {
    background-color: ${lighten(0.01, colors.background)};
    border-color: ${(props: DropzoneRootProps): string => lighten(0.05, getColor(props))};
    color: ${lighten(0.1, colors.textSecondary)};
  }
`;

const UploadDragAndDrop: FC = (): ReactElement => {
  const { dispatch } = useContext(GitDataStore);
  const history = useHistory();

  const onDrop = useCallback(
    (acceptedFiles): void => {
      const reader = new FileReader();
      reader.onload = (): void => {
        const text = String(reader.result);
        const data = JSON.parse(text) as GitStatData;
        dispatch({ type: 'LOAD_DATA', data });
        history.push('/graphs');
      };
      reader.readAsText(acceptedFiles[0]);
    },
    [dispatch, history],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'application/json',
  });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag &apos;n&apos; drop your JSON file here, or click to select one</p>
    </Container>
  );
};

export default UploadDragAndDrop;
