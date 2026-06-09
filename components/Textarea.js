import React from 'react';

import { Field } from 'formik';

import ErrorMessage from './ErrorMessage';

function Textarea({
  name, placeholder, disabled,
}) {
  return (
    <div className="w-full">
      <Field
        className="w-full p-3 h-48 border rounded-md disabled:border-gray bg-white dark:bg-black dark:text-white dark:placeholder-gray transition-colors duration-200 focus:border-black dark:focus:border-white"
        component="textarea"
        name={name}
        disabled={disabled}
        maxLength={4000}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </div>
  );
}

export default Textarea;
