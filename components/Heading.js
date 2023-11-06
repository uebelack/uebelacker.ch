import React, { ReactNode } from 'react';

export default function Heading({ id, children } : { id?: string, children: ReactNode }) {
  return (
    <h1 id={id} className="text-2xl pt-5 mb-6">{children}</h1>
  );
}
