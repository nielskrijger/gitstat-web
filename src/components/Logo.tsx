import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import LogoSVG from '../../assets/logo.svg';
import useRouter from '../hooks/useRouter';
import { colors } from '../styles/colors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const StyledLogo = styled.div`
  font-size: 2rem;
  font-family: Lato, sans-serif;
  letter-spacing: -0.1rem;
  padding-left: 0.3rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
  color: ${colors.text};
`;

const Logo: FC = (): ReactElement => {
  const { history } = useRouter();

  function gotoHome(): void {
    history.push('/');
  }

  return (
    <Container onClick={gotoHome}>
      <LogoSVG />
      <StyledLogo>gitstat</StyledLogo>
    </Container>
  );
};

export default Logo;
