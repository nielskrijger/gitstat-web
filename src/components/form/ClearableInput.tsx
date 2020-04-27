import React, { InputHTMLAttributes, ReactElement } from 'react';
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

export default ({
  onClear,
  style,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>): ReactElement => {
  return (
    <Container style={style}>
      <StyledInput type="text" {...props} />
      <IconLink onClick={onClear}>
        <CrossSVG />
      </IconLink>
    </Container>
  );
};
