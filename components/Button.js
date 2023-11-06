/* eslint-disable react/button-has-type */
import React from 'react';

function Button({
  id, type, disabled, children,
}) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      className="
      py-2
      px-4
      border
      hover:bg-black
      hover:text-white
      dark:hover:bg-white
      dark:hover:text-black
      disabled:bg-gray-light
      disabled:text-gray
      dark:disabled:bg-gray-dark"
    >
      {children}
    </button>
  );
}

export default Button;
