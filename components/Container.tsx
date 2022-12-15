import React, { ReactNode } from 'react';

export default function Container({ className = undefined, children } : { className?: string, children: ReactNode }) {
  return (<div className={[className, 'md:container', 'px-4'].filter((c) => c).join(' ')}>{children}</div>);
}
