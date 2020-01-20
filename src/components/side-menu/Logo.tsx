import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import useRouter from '../../hooks/useRouter';
import { colors } from '../../styles/colors';

const StyledLogo = styled.div`
  font-size: 2rem;
  font-family: Lato, sans-serif;
  letter-spacing: -0.1rem;
  color: ${colors.text};
  font-weight: bold;
  padding-left: 0.7rem;

  &:hover {
    color: ${colors.primary};
    cursor: pointer;
  }
`;

const Logo: FC = (): ReactElement => {
  const { history } = useRouter();

  function gotoHome(): void {
    history.push('/');
  }

  return <StyledLogo onClick={gotoHome}>gitstat</StyledLogo>;
};

export default Logo;
