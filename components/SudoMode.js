import React, { useEffect, useState, useRef } from 'react';

export default function SudoMode() {
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      bufferRef.current = (bufferRef.current + e.key).slice(-4);
      if (bufferRef.current === 'sudo') {
        setActive(true);
        bufferRef.current = '';
        setTimeout(() => setActive(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!active) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        textAlign: 'center',
        padding: '12px',
        background: 'rgba(220, 38, 38, 0.95)',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        animation: 'fadeIn 0.3s ease-in',
      }}
    >
      <span style={{ marginRight: '8px' }}>🔓</span>
      root@uebelacker.ch:~# Access granted. With great power comes great responsibility.
      <span style={{ marginLeft: '8px' }}>🔓</span>
    </div>
  );
}
