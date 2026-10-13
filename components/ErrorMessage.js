import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';

export default function ErrorMessage({ name }) {
  return (
    <div className="field-error" role="alert">
      <FormikErrorMessage name={name} />
    </div>
  );
}
