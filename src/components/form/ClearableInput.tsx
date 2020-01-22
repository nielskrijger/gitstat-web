import React, { FC, InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';
import CrossSVG from '../../../assets/icons/cross.svg';
import { colors } from '../../styles/colors';
import StyledInput from './StyledInput';

interface InputProps {
  readonly onClear: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const IconButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 1.1rem;
  height: 1.3rem;
  display: inline-block;
  margin-right: 0.2rem;
  color: ${colors.text};
  transition: all 0.2s ease-in-out;
  position: absolute;
  right: 0.6rem;

  &:hover {
    color: ${colors.textDisabled};
  }
`;

const ClearableInput: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  onClear,
  style,
  ...props
}): ReactElement => {
  return (
    <Container style={style}>
      <StyledInput type="text" {...props} />
      <IconButton onClick={onClear}>
        <CrossSVG />
      </IconButton>
    </Container>
  );
};

export default ClearableInput;
