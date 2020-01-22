import * as H from 'history';
import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface SideMenuProps {
  readonly to: H.LocationDescriptor;
  readonly icon: ReactElement;
}

const MenuItemLink = styled(NavLink)`
  display: block;
  color: ${colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  flex: 1;
  flex-direction: row;
  padding: 0.3rem 1.4rem;

  &:hover {
    color: ${colors.link};
  }
`;

const MenuIcon = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  display: inline-block;
  margin-right: 1rem;
  vertical-align: -0.5rem;
`;

const MenuItem: FC<SideMenuProps> = ({ to, icon, children }): ReactElement => (
  <MenuItemLink
    to={to}
    activeStyle={{
      fontWeight: 'bold',
      color: colors.link,
    }}
  >
    <MenuIcon>{icon}</MenuIcon>
    {children}
  </MenuItemLink>
);

export default MenuItem;
