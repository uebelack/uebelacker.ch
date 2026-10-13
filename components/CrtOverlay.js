import React from 'react';

/*
  The CRT layer: scanlines, a rolling sync bar and a vignette, over the whole
  viewport. Pure CSS (see Overlays.css) — this is just the three divs it needs.

  aria-hidden and pointer-events: none, so it is invisible to both the
  accessibility tree and the hit-testing.
*/
export default function CrtOverlay() {
  return (
    <div className="crt" aria-hidden="true">
      <div className="crt__lines" />
      <div className="crt__roll" />
      <div className="crt__vignette" />
    </div>
  );
}
