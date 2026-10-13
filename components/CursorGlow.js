import React, { useEffect, useRef, useState } from 'react';

/*
  A soft magenta light that follows the pointer, screen-blended so it only ever
  adds brightness to what is underneath.

  Two gates before it mounts at all: a fine pointer (there is no cursor to
  follow on a touch screen) and no reduced-motion preference. Both are checked
  in an effect rather than during render, because matchMedia does not exist on
  the server and the markup has to match on hydration.

  Like ScrollProgress, the position goes straight into a custom property via
  one rAF — a 60 Hz setState driving a decorative gradient would be the most
  expensive thing on the page.
*/
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !calm);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    let frame = 0;
    let x = -9999;
    let y = -9999;

    const write = () => {
      frame = 0;
      node.style.setProperty('--cursor-x', `${x}px`);
      node.style.setProperty('--cursor-y', `${y}px`);
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(write);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
