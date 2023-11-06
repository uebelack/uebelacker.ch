import React, { ReactNode } from 'react';

export default function Section({ className = undefined, children } : { className?: string, children: ReactNode }) {
  return (<div className={[className, 'section'].filter((c) => c).join(' ')}>{children}</div>);
}
