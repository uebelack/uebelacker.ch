import React from 'react';
import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

export default function Textarea({ name, placeholder, disabled = false }) {
  return (
    <div className="w-full">
      <Field
        className="field field--textarea"
        component="textarea"
        name={name}
        disabled={disabled}
        maxLength={4000}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <ErrorMessage name={name} />
    </div>
  );
}
