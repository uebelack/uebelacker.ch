import React from 'react';

/*
  Chromatic-aberration glitch.

  The two offset copies are CSS pseudo-elements fed from `data-text`, not extra
  DOM nodes — so the accessibility tree and the text selection both see one
  plain string, and the effect costs nothing when it is not running.

  `always` runs it continuously (the 404 headline); without it the glitch is a
  hover state (the wordmark).
*/
export default function GlitchText({ children, className = '', always = false }) {
  const text = typeof children === 'string' ? children : undefined;

  return (
    <span
      className={['glitch', always ? 'is-glitching' : '', className].filter(Boolean).join(' ')}
      data-text={text}
    >
      {children}
    </span>
  );
}
