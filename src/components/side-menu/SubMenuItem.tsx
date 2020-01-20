import * as H from 'history';
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

const MenuItemLink = styled.div`
  color: ${colors.textSecondary};
  font-weight: 400;
  padding: 0.4rem 3.8rem;

  &:hover {
    color: ${colors.link};
  }
`;

interface SideMenuProps {
  readonly to: H.LocationDescriptor;
  readonly onClick?: () => void;
}

const MenuItem: FC<SideMenuProps> = ({ to, children }): ReactElement => (
  <Link to={to}>
    <MenuItemLink>{children}</MenuItemLink>
  </Link>
);

export default MenuItem;
