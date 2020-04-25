import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import LeftArrowIcon from '../../../assets/icons/double-arrow-left.svg';
import { colors } from '../../styles/colors';
import { transitionDelay } from '../../styles/styles';
import IconLink from '../buttons/IconLink';
import Icon from '../icons/Icon';

interface Props {
  readonly flip: boolean;
  readonly onClick: () => void;
}

const ButtonContainer = styled(IconLink)<Props>`
  position: absolute;
  top: 1.8rem;
  right: -0.9rem;
  margin: 0;
  padding: 0.3rem;
  border: 1px solid ${colors.border};
  border-radius: 50%;
  background-color: ${colors.background};
  transform: rotate(${({ flip }): string => (flip ? '180deg' : '0deg')});
  transition: all ${transitionDelay * 1.5}ms linear;

  &:hover {
    border-color: ${colors.text};
    background-color: ${colors.text};
    color: ${colors.background};
  }
`;

const MenuMinimizeButton: FC<Props> = (props): ReactElement => (
  <ButtonContainer {...props}>
    <Icon style={{ width: '0.9rem', height: '0.9rem' }}>
      <LeftArrowIcon />
    </Icon>
  </ButtonContainer>
);

export default MenuMinimizeButton;
