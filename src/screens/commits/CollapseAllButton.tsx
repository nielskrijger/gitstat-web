import React, { CSSProperties, FC, ReactElement } from 'react';
import styled from 'styled-components';
import CollapseIcon from '../../../assets/icons/collapse.svg';
import TransparentButton from '../../components/buttons/TransparentButton';
import { colors } from '../../styles/colors';
import { borderRadius } from '../../styles/styles';

interface CollapseAllButtonProps {
  readonly onClick: () => void;
  readonly style?: CSSProperties;
}

const Icon = styled(TransparentButton)`
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

  &:active {
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }
`;

const CollapseAllButton: FC<CollapseAllButtonProps> = ({ onClick, style }): ReactElement => (
  <Icon onClick={onClick} style={style} title="Collapse all">
    <CollapseIcon />
  </Icon>
);

export default CollapseAllButton;
