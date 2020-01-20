import React, { FC, ReactElement } from 'react';
import { FieldRenderProps } from 'react-final-form';
import InputError from './InputError';
import StyledInput from './StyledInput';

interface InputProps {
  readonly showValid?: boolean;
}

const Input: FC<InputProps & FieldRenderProps<HTMLInputElement, HTMLInputElement>> = ({
  showValid,
  input,
  meta,
  ...props
}): ReactElement => {
  const hasError = meta.touched === true && meta.error !== undefined;
  const isValid = showValid && meta.touched && meta.error === undefined && !meta.active;
  return (
    <>
      <StyledInput type="text" {...input} {...props} hasError={hasError} isValid={isValid} />
      <InputError hasError={hasError}>{meta.error}</InputError>
    </>
  );
};

export default Input;
