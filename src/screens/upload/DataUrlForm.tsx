import React, { FC, ReactElement } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import styled from 'styled-components';
import Button from '../../components/Button';
import FormError from '../../components/form/FormError';
import Input from '../../components/form/Input';

const FormRow = styled.div`
  display: flex;
`;

const DataUrlForm: FC<FormRenderProps> = ({
  handleSubmit,
  submitting,
  submitError,
}): ReactElement => (
  <form onSubmit={handleSubmit}>
    <FormError error={submitError} show={!submitting} />
    <FormRow>
      <Field component={Input} type="text" name="url" placeholder="https://example.com/data.json" />
      <Button type="submit" isLoading={submitting}>
        Submit
      </Button>
    </FormRow>
  </form>
);

export default DataUrlForm;
