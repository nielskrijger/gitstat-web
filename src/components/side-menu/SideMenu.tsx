import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import AboutIcon from '../../../assets/icons/about.svg';
import ChartIcon from '../../../assets/icons/chart.svg';
import CommitIcon from '../../../assets/icons/commit.svg';
import ConfigIcon from '../../../assets/icons/config.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import { colors } from '../../styles/colors';
import Logo from '../Logo';
import MenuItem from './MenuItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
  padding: 0 1rem;
`;

const MenuContainer = styled.nav``;

const LogoContainer = styled.div`
  margin: 1.3rem 0.3rem;
`;

const SideMenu: FC = (): ReactElement => (
  <Container>
    <LogoContainer>
      <Logo />
    </LogoContainer>
    <MenuContainer>
      <MenuItem to="/config" icon={<ConfigIcon />}>
        Config
      </MenuItem>

      <MenuItem to="/graphs" icon={<ChartIcon />}>
        Graphs
      </MenuItem>

      <MenuItem to="/commits" icon={<CommitIcon />}>
        Commits
      </MenuItem>

      <MenuItem to="/data" icon={<UploadIcon />}>
        Change data
      </MenuItem>

      <MenuItem to="/about" icon={<AboutIcon />}>
        About
      </MenuItem>
    </MenuContainer>
  </Container>
);

export default SideMenu;
