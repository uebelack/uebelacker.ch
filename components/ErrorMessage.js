import React from 'react';

import { ErrorMessage as FormikErrorMessage } from 'formik';

function ErrorMessage({ name }) {
  return (
    <div className="error-message text-red text-sm h-6">
      <FormikErrorMessage name={name} />
    </div>
  );
}

export default ErrorMessage;
