import React from 'react';
import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

export default function Checkbox({ name, disabled = false, children }) {
  return (
    <div className="w-full">
      <Field
        className="checkbox"
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
      />
      <label htmlFor={name}>{children}</label>
      <ErrorMessage name={name} />
    </div>
  );
}
