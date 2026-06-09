import React from 'react';

export default function Heading({ id, children }) {
  return (
    <div id={id} className="pt-5 mb-10">
      <h1 className="text-3xl tracking-tight">{children}</h1>
      <div className="w-10 h-0.5 bg-black dark:bg-white mt-3" />
    </div>
  );
}
