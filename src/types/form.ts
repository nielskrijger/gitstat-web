import { FormApi, SubmissionErrors } from 'final-form';

export type SubmitResult = Promise<SubmissionErrors | undefined>;

export interface FormHandler<T> {
  isSuccess: boolean;
  submitForm(values: T, form: FormApi): SubmitResult;
}
