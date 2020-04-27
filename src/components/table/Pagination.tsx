import { darken } from 'polished';
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';

const PaginationStyle = createGlobalStyle`
  .pagination {
    display: inline-block;
    margin: 0;
    padding: 0;
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a {
    position: relative;
    float: left;
    padding: 6px 12px;
    text-decoration: none;
    margin-left: -1px;
    color: ${colors.text};
    background-color: ${colors.inputBackground};
    border: 1px solid ${colors.inputBorder};
    
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: ${colors.text};
      border-color: ${colors.text};
      color: ${colors.inputBackground};
      cursor: pointer;
    }
  }
  .pagination > li:first-child > a {
    margin-left: 0;
    border-bottom-left-radius: ${borderRadius};
    border-top-left-radius: ${borderRadius};
  }
  .pagination > li:last-child > a {
    border-bottom-right-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};
  }
  .pagination > .selected > a {
    color: ${colors.inputBackground};
    background-color: ${colors.text};
    border-color: ${colors.text};
  }
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
    color: ${darken(0.5, colors.text)};
  }
`;

const PaginationContainer = styled.div`
  display: inline-block;
`;

interface Props {
  readonly currentPage: number;
  readonly itemCount: number;
  readonly itemsPerPage: number;
  readonly onPageChange: (page: number) => void;
  readonly style?: CSSProperties;
}

export default ({
  currentPage,
  itemCount,
  itemsPerPage,
  onPageChange,
  style,
}: Props): ReactElement | null => {
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(itemCount / itemsPerPage));
  }, [itemCount, itemsPerPage]);

  if (pageCount <= 1) {
    return null;
  }

  return (
    <PaginationContainer style={style}>
      <PaginationStyle />
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={({ selected }): void => onPageChange(selected)}
        containerClassName="pagination"
        initialPage={currentPage}
        forcePage={currentPage}
      />
    </PaginationContainer>
  );
};
