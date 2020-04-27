import React, { CSSProperties, FC, ReactElement } from 'react';
import styled from 'styled-components';
import CollapseIcon from '../../../assets/icons/collapse.svg';
import IconLink from '../../components/buttons/IconLink';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';

const Icon = styled(IconLink)`
  width: 1.8rem;
  height: 1.8rem;
  display: inline-block;
  padding: 5px;
  border: 1px solid ${colors.inputBorder};
  border-radius: ${borderRadius};
  background-color: ${colors.inputBackground};
  margin-left: 0.3rem;

  &:hover {
    border-color: ${colors.inputBorderHover};
  }
`;

interface Props {
  readonly onClick: () => void;
  readonly style?: CSSProperties;
}

const CollapseAllButton: FC<Props> = ({ onClick, style }): ReactElement => (
  <Icon onClick={onClick} style={style} title="Collapse all">
    <CollapseIcon />
  </Icon>
);

export default CollapseAllButton;
