import * as H from 'history';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import MenuItemLink from './MenuItemLink';

interface Props {
  readonly to: H.LocationDescriptor;
  readonly icon: ReactElement;
  readonly title: string;
  readonly iconOnly?: boolean;
  readonly exact?: boolean;
}

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

export default ({ to, icon, title, exact = false, iconOnly = false }: Props): ReactElement => (
  <MenuItemLink
    to={to}
    exact={exact}
    activeStyle={{
      fontWeight: 'bold',
      color: colors.primary,
    }}
    iconOnly={iconOnly}
    title={title}
  >
    <MenuIcon largeIcon={iconOnly}>{icon}</MenuIcon>
    {!iconOnly && <MenuText>{title}</MenuText>}
  </MenuItemLink>
);
