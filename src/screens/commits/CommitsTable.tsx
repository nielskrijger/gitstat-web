import React, { CSSProperties, FC, Fragment, ReactElement } from 'react';
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

const TR = styled.tr`
  :hover {
    background-color: ${colors.backgroundSecondary};
    cursor: pointer;
  }
`;

const TRDetails = styled(TR)`
  border: 1px solid ${colors.border};

  :hover {
    background-color: transparent;
  }
`;

interface CommitsTableProps {
  readonly data: ExtendedCommit[];
  readonly expandedRows: string[];
  readonly onClickRow: (id: string) => void;
}

const noWrapStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as CSSProperties;

const CommitsTable: FC<CommitsTableProps> = ({ data, onClickRow, expandedRows }): ReactElement => (
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
        (commit): ReactElement => (
          <Fragment key={commit.hash}>
            {!expandedRows.includes(commit.hash) && (
              <TR onClick={(): void => onClickRow(commit.hash)}>
                <td style={{ color: colors.textSecondary, ...noWrapStyle }} title={commit.project}>
                  {commit.project}
                </td>
                <td
                  style={{ color: colors.textSecondary, ...noWrapStyle }}
                  title={commit.committer.time}
                >
                  <ShortDateTime time={commit.committer.time} />
                </td>
                <td style={noWrapStyle}>
                  {commit.isMerge && <MergeIcon />} {commit.message}
                </td>
                <td style={{ color: colors.textSecondary }}>
                  <Author signature={commit.author} />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Addition excluded={commit.excluded}>{commit.additions}</Addition>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Deletion excluded={commit.excluded}>{commit.deletions}</Deletion>
                </td>
              </TR>
            )}
            {expandedRows.includes(commit.hash) && (
              <TRDetails onClick={(): void => onClickRow(commit.hash)}>
                <td colSpan={6}>
                  <CommitDetails commit={commit} />
                </td>
              </TRDetails>
            )}
          </Fragment>
        ),
      )}
    </tbody>
  </Table>
);

export default CommitsTable;
