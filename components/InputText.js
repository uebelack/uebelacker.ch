import React from 'react';

import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

function InputText({
  name, placeholder, disabled = false,
}) {
  return (
    <div className="w-full">
      <Field
        className="w-full p-2 border disabled:border-gray dark:text-black"
        type="text"
        name={name}
        disabled={disabled}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </div>
  );
}

export default InputText;
