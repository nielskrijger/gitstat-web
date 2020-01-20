import * as H from 'history';
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import TransparentButton from '../TransparentButton';

interface SideMenuProps {
  readonly to?: H.LocationDescriptor;
  readonly onClick?: () => void;
  readonly icon: ReactElement;
}

const MenuItemLink = styled.div`
  color: ${colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  flex: 1;
  flex-direction: row;
  padding: 0.4rem 1.6rem;

  &:hover {
    color: ${colors.link};
  }
`;

const MenuIcon = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  display: inline-block;
  margin-right: 0.5rem;
  vertical-align: -0.5rem;
`;

const MenuItem: FC<SideMenuProps> = ({ to, onClick, icon, children }): ReactElement => {
  if (to) {
    return (
      <Link to={to}>
        <MenuItemLink>
          <MenuIcon>{icon}</MenuIcon>
          {children}
        </MenuItemLink>
      </Link>
    );
  }
  return (
    <TransparentButton type="button" onClick={onClick}>
      <MenuItemLink>
        <MenuIcon>{icon}</MenuIcon>
        {children}
      </MenuItemLink>
    </TransparentButton>
  );
};

export default MenuItem;
