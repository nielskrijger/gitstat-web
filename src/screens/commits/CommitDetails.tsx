import React, { FC, ReactElement } from 'react';
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
import markdown from '../../utils/markdown';

interface CommitDetailProps {
  commit: ExtendedCommit;
}

const Container = styled.div`
  padding: 1rem;
  white-space: normal;
`;

/**
 * Splits string a number of times and returns the remainder as a the last element of the array.
 */
function splitRemainder(str: string, separator: string, limit: number): string[] {
  const pieces = str.split(separator);
  if (pieces.length > limit) {
    const rest = pieces.splice(0, limit);
    rest.push(pieces.join(separator));
    return rest;
  }
  return pieces;
}

const CommitDetails: FC<CommitDetailProps> = ({ commit }): ReactElement => {
  const [title, description] = splitRemainder(commit.message, '\n', 1);

  return (
    <Container>
      <H3>
        {commit.isMerge && <MergeIcon />} {title.trim()}
      </H3>
      <SubHeader>
        {commit.project} - {commit.author.name} - <ShortDateTime time={commit.committer.time} /> -{' '}
        {commit.hash}
      </SubHeader>
      {description && <p dangerouslySetInnerHTML={{ __html: markdown(description) }} />}
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
                <td style={{ color: file.excluded ? colors.textDisabled : colors.text }}>
                  <code>{file.filepath}</code>
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
};

export default CommitDetails;
