import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import LeftArrowIcon from '../../../assets/icons/double-arrow-left.svg';
import { colors } from '../../styles/colors';
import { transitionDelay } from '../../styles/styles';
import IconButton from '../buttons/IconButton';

interface MenuMinimizeButtonProps {
  readonly flip: boolean;
  readonly onClick: () => void;
}

const ButtonContainer = styled(IconButton)<MenuMinimizeButtonProps>`
  position: absolute;
  top: 1.8rem;
  right: -0.9rem;
  margin: 0;
  padding: 0.3rem;
  border: 1px solid ${colors.border};
  border-radius: 50%;
  background-color: ${colors.background};
  width: 1rem;
  height: 1rem;
  transform: rotate(${({ flip }): string => (flip ? '180deg' : '0deg')});
  transition: all ${transitionDelay * 1.5}ms linear;

  &:hover {
    border-color: ${colors.text};
    background-color: ${colors.text};
    color: ${colors.background};
  }
`;

const MenuMinimizeButton: FC<MenuMinimizeButtonProps> = (props): ReactElement => (
  <ButtonContainer {...props}>
    <LeftArrowIcon />
  </ButtonContainer>
);

export default MenuMinimizeButton;
