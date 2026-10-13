import React from 'react';
import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

export default function InputText({ name, placeholder, disabled = false }) {
  return (
    <div className="w-full">
      <Field
        className="field"
        type="text"
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <ErrorMessage name={name} />
    </div>
  );
}
