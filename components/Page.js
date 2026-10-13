import React from 'react';

/*
  The page wrapper. Its only job is to open a stacking context above the fixed
  grid painted on body::before — see base.css.
*/
export default function Page({ children }) {
  return <div className="page">{children}</div>;
}
