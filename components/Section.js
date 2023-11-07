import React from 'react';

export default function Section({ className = undefined, children }) {
  return (<div className={[className, 'section'].filter((c) => c).join(' ')}>{children}</div>);
}
