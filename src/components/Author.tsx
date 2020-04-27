import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { Signature } from '../types/gitStatData';

interface Props {
  readonly signature: Signature;
}

const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author: FC<Props> = ({ signature }): ReactElement => (
  <Name title={`${signature.name}`}>{signature.name}</Name>
);

export default Author;
