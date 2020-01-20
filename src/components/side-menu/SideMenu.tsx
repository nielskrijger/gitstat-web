import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import AboutIcon from '../../../assets/icons/about.svg';
import ChartIcon from '../../../assets/icons/chart.svg';
import CommitIcon from '../../../assets/icons/commit.svg';
import ConfigIcon from '../../../assets/icons/config.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import { colors } from '../../styles/colors';
import Logo from './Logo';
import MenuItem from './MenuItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
  padding: 0 1rem;
`;

const MenuBlock = styled.nav``;

const LogoBlock = styled.div`
  margin: 2rem 1rem;
`;

const SideMenu: FC = (): ReactElement => (
  <Container>
    <LogoBlock>
      <Logo />
    </LogoBlock>
    <MenuBlock>
      <MenuItem to="/data" icon={<UploadIcon />}>
        Change data
      </MenuItem>

      <MenuItem to="/config" icon={<ConfigIcon />}>
        Config
      </MenuItem>

      <MenuItem to="/graphs" icon={<ChartIcon />}>
        Graphs
      </MenuItem>

      <MenuItem to="/commits" icon={<CommitIcon />}>
        Commits table
      </MenuItem>

      <MenuItem to="/about" icon={<AboutIcon />}>
        About
      </MenuItem>
    </MenuBlock>
  </Container>
);

export default SideMenu;
