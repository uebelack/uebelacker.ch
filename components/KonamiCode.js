import React, { useEffect, useState, useRef, useCallback } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

// Per-column hue, assigned once so a column keeps its colour as it falls
// instead of strobing between the three.
const COLUMN_COLORS = ['#00f0ff', '#f92aad', '#72f1b8'];

/*
  The Konami payoff: digital rain, in the site's palette rather than the
  original's phosphor green.

  The trail is the usual trick — instead of clearing the canvas, a nearly
  transparent fill is painted over the previous frame, so old glyphs decay
  instead of vanishing. The fill here is the theme's abyss at 12%, which is
  what gives the trails their violet cast.
*/
function NeonRain({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -40);
    const hues = Array.from({ length: columns }, (_, i) => COLUMN_COLORS[i % COLUMN_COLORS.length]);

    ctx.fillStyle = '#0a0518';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 5, 24, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < columns; i += 1) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // The leading glyph is white and glowing; the tail is the column's own
        // colour and flat, which is cheaper and reads as depth.
        ctx.shadowBlur = 12;
        ctx.shadowColor = hues[i];
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, x, y);

        ctx.shadowBlur = 0;
        ctx.fillStyle = hues[i];
        ctx.globalAlpha = 0.55;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fontSize);
        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    const interval = setInterval(draw, 33);
    const timeout = setTimeout(onComplete, 6000);
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div
      role="presentation"
      onClick={onComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        cursor: 'pointer',
        background: '#0a0518',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />
      <div
        style={{
          position: 'absolute',
          bottom: '8vh',
          width: '100%',
          textAlign: 'center',
          fontSize: '0.72rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#8bfff5',
          textShadow: '0 0 12px rgba(0, 240, 255, 0.8)',
        }}
      >
        30 lives granted — click to resume
      </div>
    </div>
  );
}

export default function KonamiCode() {
  const [activated, setActivated] = useState(false);
  const inputRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      inputRef.current = [...inputRef.current, e.key].slice(-KONAMI.length);
      if (inputRef.current.join(',') === KONAMI.join(',')) {
        setActivated(true);
        inputRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleComplete = useCallback(() => setActivated(false), []);

  if (!activated) return null;
  return <NeonRain onComplete={handleComplete} />;
}
