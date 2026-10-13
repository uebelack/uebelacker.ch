import React from 'react';

export default function Section({ className = undefined, id = undefined, children }) {
  return (
    <section id={id} className={['section', className].filter(Boolean).join(' ')}>
      {children}
    </section>
  );
}
