import React, { FC, ReactElement } from 'react';
import { FieldRenderProps } from 'react-final-form';
import InputError from './InputError';
import StyledInput from './StyledInput';

interface Props {
  readonly showValid?: boolean;
}

const Input: FC<Props & FieldRenderProps<HTMLInputElement, HTMLInputElement>> = ({
  showValid,
  input,
  meta,
  ...props
}): ReactElement => {
  const hasError = meta.touched === true && meta.error !== undefined;
  const isValid = showValid && meta.touched && meta.error === undefined && !meta.active;
  return (
    <>
      <StyledInput
        type="text"
        {...input}
        {...props}
        value={
          (input.value as unknown) as string /* TODO found no clean solution, probably issue with typings */
        }
        hasError={hasError}
        isValid={isValid}
      />
      <InputError hasError={hasError}>{meta.error}</InputError>
    </>
  );
};

export default Input;
