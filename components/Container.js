import React from 'react';

export default function Container({ className = undefined, children }) {
  return (
    <div className={['md:container', 'px-4', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
