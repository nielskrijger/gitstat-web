import React, { FC, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import Pagination from '../../components/table/Pagination';
import { useStoredState } from '../../hooks/useStateWithSessionStorage';
import { OrderByType, useSortedCommits } from '../../selectors/commits';
import { ExtendedCommit } from '../../types/commits';
import CollapseAllButton from './CollapseAllButton';
import CommitsTable from './CommitsTable';
import SelectItemCount from './SelectItemCount';
import SelectOrderBy from './SelectOrderBy';
import useExpandableRows from './useExpandableRows';

const TableControlContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
`;

const CommitsScreen: FC = (): ReactElement => {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useStoredState<OrderByType>('commits:orderby', OrderByType.TIME);
  const { toggleRowCollapse, collapseAll, expandedRows } = useExpandableRows();
  const commits = useSortedCommits(orderBy);

  const [data, setData] = useState<ExtendedCommit[]>([]);
  useEffect((): void => {
    const start = page * itemsPerPage;
    setData(commits.slice(start, start + itemsPerPage));
  }, [page, commits, itemsPerPage]);

  const handleSetItemsPerPage = (nrOfItems: number): void => {
    setItemsPerPage(nrOfItems);
    setPage(0);
  };

  return (
    <>
      <H1>Commits</H1>

      <TableControlContainer>
        <SelectOrderBy onChange={setOrderBy} value={orderBy} />
        <SelectItemCount onChange={handleSetItemsPerPage} value={itemsPerPage} />
        <CollapseAllButton onClick={collapseAll} />
        <Pagination
          currentPage={page}
          itemCount={commits.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          style={{ marginLeft: 'auto' }}
        />
      </TableControlContainer>

      <CommitsTable data={data} onClickRow={toggleRowCollapse} expandedRows={expandedRows} />

      <TableControlContainer>
        <Pagination
          currentPage={page}
          itemCount={commits.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          style={{ marginLeft: 'auto' }}
        />
      </TableControlContainer>
    </>
  );
};

export default CommitsScreen;
