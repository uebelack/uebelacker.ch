import React from 'react';

/*
  The neon outline button. The label is wrapped so it can sit above the
  gradient that wipes in behind it on hover — see Button.css.
*/
export default function Button({
  id, type = 'button', disabled = false, className = '', children,
}) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      className={['btn', className].filter(Boolean).join(' ')}
    >
      <span className="btn__label">{children}</span>
    </button>
  );
}
