import React from 'react';

import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

function Checkbox({
  name, disabled, children,
}) {
  return (
    <div className="w-full">
      <div className="checkbox-wrapper">
        <Field
          className="checkbox"
          type="checkbox"
          id={name}
          name={name}
          disabled={disabled}
        />
        <label htmlFor={name}>
          {children}
        </label>
      </div>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Checkbox;
