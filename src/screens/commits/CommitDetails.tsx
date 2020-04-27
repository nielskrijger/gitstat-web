import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Addition from '../../components/Addition';
import Deletion from '../../components/Deletion';
import H3 from '../../components/H3';
import MergeIcon from '../../components/icons/MergeIcon';
import ShortDateTime from '../../components/ShortDateTime';
import SubHeader from '../../components/SubHeader';
import { TH } from '../../components/table/Table';
import { colors } from '../../styles/colors';
import { ExtendedCommit } from '../../types/commits';
import { CommitFile } from '../../types/gitStatData';
import markdown from '../../utils/markdown';
import ExcludeCommit from './ExcludeCommit';

const Container = styled.div`
  margin: 1rem;
  white-space: normal;
  width: fit-content;
`;

const filenameCopy = (file: CommitFile): string => {
  if (file.renameOf) {
    const similarity = Math.round(file.similarity!);
    return `${file.renameOf} => ${file.filepath} (${similarity}% similar)`;
  }
  return file.filepath;
};

interface Props {
  readonly commit: ExtendedCommit;
}

export default ({ commit }: Props): ReactElement => (
  <Container>
    <H3>
      {commit.isMerge && <MergeIcon />} {commit.title}
    </H3>

    <SubHeader>
      {commit.project} - {commit.author.name} - <ShortDateTime time={commit.committer.time} /> -{' '}
      {commit.hash}
    </SubHeader>

    <ExcludeCommit value={commit.hash} />

    {commit.description ? (
      <blockquote dangerouslySetInnerHTML={{ __html: markdown(commit.description) }} />
    ) : (
      <div style={{ height: '1rem' }} />
    )}

    <table className="plain">
      <thead>
        <tr>
          <TH style={{ textAlign: 'left' }}>File</TH>
          <TH style={{ textAlign: 'right' }}>
            <Addition>+</Addition>
          </TH>
          <TH style={{ textAlign: 'right' }}>
            <Deletion>-</Deletion>
          </TH>
        </tr>
      </thead>
      <tbody>
        {commit.extendedFiles.map(
          (file): ReactElement => (
            <tr key={file.filepath}>
              <td style={{ color: commit.excluded ? colors.textDisabled : colors.text }}>
                <code>{filenameCopy(file)}</code>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Addition excluded={file.excluded}>{file.additions}</Addition>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Deletion excluded={file.excluded}>{file.deletions}</Deletion>
              </td>
            </tr>
          ),
        )}
        <tr>
          <td />
          <td style={{ textAlign: 'right' }}>
            <Addition excluded={commit.excluded}>
              <strong>{commit.additions}</strong>
            </Addition>
          </td>
          <td style={{ textAlign: 'right' }}>
            <Deletion excluded={commit.excluded}>
              <strong>{commit.deletions}</strong>
            </Deletion>
          </td>
        </tr>
      </tbody>
    </table>
  </Container>
);
