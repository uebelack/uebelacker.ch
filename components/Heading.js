import React from 'react';

export default function Heading({ id, children }) {
  return (
    <h1 id={id} className="text-2xl pt-5 mb-6">{children}</h1>
  );
}
