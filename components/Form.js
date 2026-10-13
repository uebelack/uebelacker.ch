import React from 'react';
import { Form as FormikForm } from 'formik';

export default function Form({ children }) {
  return <FormikForm className="form" noValidate>{children}</FormikForm>;
}
