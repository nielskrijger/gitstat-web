import React, { FC, InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';
import CrossSVG from '../../../assets/icons/cross.svg';
import IconButton from '../buttons/IconButton';
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
