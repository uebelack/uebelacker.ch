import { ReactNode } from 'react';

export default function Section({ className, children } : { className?: string, children: ReactNode }) {
  return (<div className={className}>{children}</div>);
}
