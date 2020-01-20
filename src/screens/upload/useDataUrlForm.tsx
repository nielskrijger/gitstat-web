import { FORM_ERROR } from 'final-form';
import { useContext, useState } from 'react';
import { GitDataStore } from '../../context/GitDataProvider';
import { FormHandler, SubmitResult } from '../../types/form';

interface DataUrlValues {
  readonly url: string;
}

const useDataUrlForm = (): FormHandler<DataUrlValues> => {
  const { dispatch } = useContext(GitDataStore);
  const [isSuccess, setIsSuccess] = useState(false);

  return {
    isSuccess,
    submitForm: async (values: DataUrlValues): SubmitResult => {
      try {
        const res = await fetch(values.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          return {
            [FORM_ERROR]: `${res.status} ${await res.text()}`,
          };
        }
        const data = await res.json();
        dispatch({ type: 'LOAD_DATA', data });
        setIsSuccess(true);
        return undefined;
      } catch (ex) {
        return {
          [FORM_ERROR]: ex.message,
        };
      }
    },
  };
};

export default useDataUrlForm;
