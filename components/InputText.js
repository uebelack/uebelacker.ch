import React from 'react';

import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

function InputText({
  name, placeholder, disabled = false,
}) {
  return (
    <div className="w-full">
      <Field
        className="w-full p-3 border rounded-md disabled:border-gray bg-white dark:bg-black dark:text-white dark:placeholder-gray transition-colors duration-200 focus:border-black dark:focus:border-white"
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
