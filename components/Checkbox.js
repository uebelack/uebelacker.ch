import React, { ReactNode } from 'react';

import { Field } from 'formik';
import ErrorMessage from './ErrorMessage';

interface Props {
  name: string;
  children: ReactNode,
  disabled: boolean;
}

function Checkbox({
  name, disabled, children,
} : Props) {
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
