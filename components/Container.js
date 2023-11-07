import React from 'react';

export default function Container({ className = undefined, children }) {
  return (<div className={[className, 'md:container', 'px-4'].filter((c) => c).join(' ')}>{children}</div>);
}
