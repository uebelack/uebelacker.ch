import React, { useEffect, useState } from 'react';

/*
  Type "sudo" anywhere outside a field and the banner drops in for three
  seconds. Styling lives in Overlays.css (.sudo-banner) so it matches the rest
  of the palette instead of carrying its own red.
*/
export default function SudoMode() {
  // A counter rather than a boolean: typing sudo again while the banner is up
  // bumps it, which re-runs the timer effect and restarts the three seconds.
  // With a boolean the second trigger would be a no-op and the banner would
  // still close on the first timeout.
  const [triggered, setTriggered] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer = '';

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      buffer = (buffer + e.key).slice(-4);
      if (buffer !== 'sudo') return;
      buffer = '';
      setTriggered((n) => n + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (triggered === 0) return undefined;
    setActive(true);
    const timeout = setTimeout(() => setActive(false), 3000);
    return () => clearTimeout(timeout);
  }, [triggered]);

  if (!active) return null;

  return (
    <div className="sudo-banner" role="status">
      <span aria-hidden="true">🔓</span>
      <span>root@uebelacker.dev:~# Access granted. With great power comes great responsibility.</span>
      <span aria-hidden="true">🔓</span>
    </div>
  );
}
