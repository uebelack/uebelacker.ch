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
      py-3
      px-8
      border
      rounded-md
      transition-all
      duration-200
      hover:bg-black
      hover:text-white
      dark:hover:bg-white
      dark:hover:text-black
      disabled:bg-gray-light
      disabled:text-gray
      dark:disabled:bg-gray-dark
      disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default Button;
