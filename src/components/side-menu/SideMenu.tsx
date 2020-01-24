import React, { Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import AboutIcon from '../../../assets/icons/about.svg';
import ChartIcon from '../../../assets/icons/chart.svg';
import CommitIcon from '../../../assets/icons/commit.svg';
import ConfigIcon from '../../../assets/icons/config.svg';
import HomeIcon from '../../../assets/icons/home.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import { usePrevious } from '../../hooks/usePrevious';
import { useWindowSize } from '../../hooks/useWindowSize';
import { colors } from '../../styles/colors';
import { mediaQuerySizes } from '../../styles/styles';
import Logo from '../Logo';
import MenuItem from './MenuItem';
import MenuMinimizeButton from './MenuMinimizeButton';

export enum MenuModes {
  COLLAPSED = 'collapsed', // TODO not supported for now, add this for mobile
  ICONS = 'icons',
  EXPANDED = 'expanded',
}

interface MenuContainerProps {
  readonly mode: MenuModes;
}

const MenuContainer = styled.div<MenuContainerProps>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
  padding: 0 1rem;
  position: relative;
  width: ${({ mode }): string => (mode === MenuModes.EXPANDED ? '11rem' : 'auto')};
`;

const LogoContainer = styled.div`
  margin: 1.3rem 0.3rem 0 0.3rem;
`;

const StyledNav = styled.nav`
  flex: 1;
  flex-direction: column;
  margin-top: 1.3rem;
`;

/**
 * Determines based on the window size in which mode the menu should be
 * shown. Changes the mode dynamically when resizing the window.
 */
const useMenuMode = (): [MenuModes, Dispatch<SetStateAction<MenuModes>>] => {
  const [mode, setMode] = useState(MenuModes.EXPANDED);
  const { width } = useWindowSize();

  const prevWidth = usePrevious(width);
  useEffect(() => {
    if (width < mediaQuerySizes.large && (!prevWidth || prevWidth >= mediaQuerySizes.large)) {
      setMode(MenuModes.ICONS);
    } else if (
      width >= mediaQuerySizes.large &&
      (!prevWidth || prevWidth < mediaQuerySizes.large)
    ) {
      setMode(MenuModes.EXPANDED);
    }
  }, [width, prevWidth]);

  return [mode, setMode];
};

const SideMenu: FC = (): ReactElement => {
  const [mode, setMode] = useMenuMode();

  const iconOnly = mode === MenuModes.ICONS;
  return (
    <MenuContainer mode={mode}>
      <MenuMinimizeButton
        flip={mode === MenuModes.ICONS}
        onClick={(): void =>
          setMode(mode === MenuModes.EXPANDED ? MenuModes.ICONS : MenuModes.EXPANDED)
        }
      />

      {mode === MenuModes.EXPANDED && (
        <LogoContainer>
          <Logo />
        </LogoContainer>
      )}

      {mode !== MenuModes.COLLAPSED && (
        <StyledNav>
          {iconOnly && <MenuItem to="/" exact icon={<HomeIcon />} title="Home" iconOnly />}
          <MenuItem to="/config" icon={<ConfigIcon />} title="Config" iconOnly={iconOnly} />
          <MenuItem to="/graphs" icon={<ChartIcon />} title="Graphs" iconOnly={iconOnly} />
          <MenuItem to="/commits" icon={<CommitIcon />} title="Commits" iconOnly={iconOnly} />
          <MenuItem
            to="/data"
            icon={<UploadIcon style={{ position: 'relative', top: '-2px' }} />}
            title="Change data"
            iconOnly={iconOnly}
          />
          <MenuItem to="/about" icon={<AboutIcon />} title="About" iconOnly={iconOnly} />
        </StyledNav>
      )}
    </MenuContainer>
  );
};

export default SideMenu;
