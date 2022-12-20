import React from 'react';

import { Field } from 'formik';

import ErrorMessage from './ErrorMessage';

interface Props {
  name: string;
  placeholder: string;
  disabled: boolean;
}

function Textarea({
  name, placeholder, disabled,
} : Props) {
  return (
    <div className="w-full">
      <Field
        className="w-full p-2 h-48 border disabled:border-gray dark:text-black"
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
