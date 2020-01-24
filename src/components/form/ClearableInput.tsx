import React, { FC, InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';
import CrossSVG from '../../../assets/icons/cross.svg';
import IconLink from '../buttons/IconLink';
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
      <IconLink onClick={onClear}>
        <CrossSVG />
      </IconLink>
    </Container>
  );
};

export default ClearableInput;
