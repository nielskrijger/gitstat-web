import * as H from 'history';
import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface MenuItemProps {
  readonly to: H.LocationDescriptor;
  readonly icon: ReactElement;
  readonly title: string;
  readonly iconOnly?: boolean;
  readonly exact?: boolean;
}

interface MenuItemLinkProps {
  readonly iconOnly: boolean;
}

const MenuItemLink = styled(NavLink)<MenuItemLinkProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ iconOnly }): string => (iconOnly ? 'center' : 'flex-start')};
  align-items: center;
  color: ${colors.text};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  padding: ${({ iconOnly }): string => (iconOnly ? '0.6rem' : '0.4rem 1.1rem')};

  &:hover {
    color: ${colors.link};
  }
`;

interface MenuIconProps {
  readonly largeIcon: boolean;
}

const MenuIcon = styled.div<MenuIconProps>`
  width: ${({ largeIcon }): string => (largeIcon ? '1.6rem' : '1.4rem')};
  height: ${({ largeIcon }): string => (largeIcon ? '1.6rem' : '1.4rem')};
  display: inline-block;
`;

const MenuText = styled.span`
  margin-left: 1rem;
`;

const MenuItem: FC<MenuItemProps> = ({
  to,
  icon,
  title,
  exact = false,
  iconOnly = false,
}): ReactElement => (
  <MenuItemLink
    to={to}
    exact={exact}
    activeStyle={{
      fontWeight: 'bold',
      color: colors.link,
    }}
    iconOnly={iconOnly}
    title={title}
  >
    <MenuIcon largeIcon={iconOnly}>{icon}</MenuIcon>
    {!iconOnly && <MenuText>{title}</MenuText>}
  </MenuItemLink>
);

export default MenuItem;
