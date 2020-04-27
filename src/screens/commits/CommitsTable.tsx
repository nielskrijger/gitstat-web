import React, { CSSProperties, Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import Addition from '../../components/Addition';
import Author from '../../components/Author';
import Deletion from '../../components/Deletion';
import MergeIcon from '../../components/icons/MergeIcon';
import ShortDateTime from '../../components/ShortDateTime';
import { Table, TH } from '../../components/table/Table';
import { colors } from '../../styles/colors';
import { ExtendedCommit } from '../../types/commits';
import CommitDetails from './CommitDetails';

const Row = styled.tr`
  :hover {
    background-color: ${colors.backgroundSecondary};
    cursor: pointer;
  }
`;

const DetailsRow = styled.tr`
  :hover {
    background-color: transparent;
  }

  td {
    border-top: 0;
  }
`;

const noWrapStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as CSSProperties;

interface Props {
  readonly data: ExtendedCommit[];
  readonly expandedRows: string[];
  readonly onClickRow: (id: string) => void;
}

export default ({ data, onClickRow, expandedRows }: Props): ReactElement => (
  <Table>
    <thead>
      <tr>
        <TH style={{ width: '10rem' }}>Project</TH>
        <TH style={{ width: '10rem' }}>Time</TH>
        <TH>Title</TH>
        <TH style={{ width: '7rem' }}>Author</TH>
        <TH style={{ width: '4rem', textAlign: 'right' }}>
          <Addition>+</Addition>
        </TH>
        <TH style={{ width: '4rem', textAlign: 'right' }}>
          <Deletion>-</Deletion>
        </TH>
      </tr>
    </thead>
    <tbody>
      {data.map(
        (commit): ReactElement => {
          const color = commit.excluded ? colors.textDisabled : colors.textSecondary;
          return (
            <Fragment key={commit.hash}>
              <Row onClick={(): void => onClickRow(commit.hash)}>
                <td style={{ color, ...noWrapStyle }} title={commit.project}>
                  {commit.project}
                </td>
                <td style={{ color, ...noWrapStyle }} title={commit.committer.time}>
                  <ShortDateTime time={commit.committer.time} />
                </td>
                <td
                  style={{
                    color: commit.excluded ? colors.textDisabled : colors.text,
                    ...noWrapStyle,
                  }}
                >
                  {commit.isMerge && <MergeIcon />} {commit.title}
                </td>
                <td style={{ color }}>
                  <Author signature={commit.author} />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Addition excluded={commit.excluded}>{commit.additions}</Addition>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Deletion excluded={commit.excluded}>{commit.deletions}</Deletion>
                </td>
              </Row>
              {expandedRows.includes(commit.hash) && (
                <DetailsRow>
                  <td colSpan={6}>
                    <CommitDetails commit={commit} />
                  </td>
                </DetailsRow>
              )}
            </Fragment>
          );
        },
      )}
    </tbody>
  </Table>
);
