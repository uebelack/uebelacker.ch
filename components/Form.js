import React from 'react';

import { Form as FormikForm } from 'formik';

function Form({ children }) {
  return (
    <div className="form-wrapper md:w-9/12">
      <FormikForm className="test">
        {children}
      </FormikForm>
    </div>
  );
}

export default Form;
