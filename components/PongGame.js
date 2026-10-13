import React, { useEffect, useRef, useCallback } from 'react';

const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 10;
const BALL_SPEED = 4;
const AI_SPEED = 3;
const TRAIL = 14;

const CYAN = '#00f0ff';
const MAGENTA = '#f92aad';
const GOLD = '#fede5d';

/*
  Pong, on the 404 page, in neon.

  The ball keeps a short history of its own positions and the trail is drawn
  from it at decreasing alpha — cheaper than a motion blur and it is the look
  the palette is asking for anyway. Everything glowing uses canvas shadowBlur,
  which is reset immediately afterwards because leaving it on makes every
  subsequent fill in the frame expensive.
*/
export default function PongGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const frameRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    state.bx += state.bdx;
    state.by += state.bdy;

    if (state.by <= 0 || state.by >= H - BALL_SIZE) state.bdy = -state.bdy;

    // Player paddle
    if (
      state.bx <= 20 + PADDLE_WIDTH
      && state.by + BALL_SIZE >= state.py
      && state.by <= state.py + PADDLE_HEIGHT
    ) {
      state.bdx = Math.abs(state.bdx);
      state.score += 1;
    }

    // AI paddle
    const aiCenter = state.ay + PADDLE_HEIGHT / 2;
    const ballCenter = state.by + BALL_SIZE / 2;
    if (aiCenter < ballCenter) state.ay += AI_SPEED;
    if (aiCenter > ballCenter) state.ay -= AI_SPEED;
    state.ay = Math.max(0, Math.min(H - PADDLE_HEIGHT, state.ay));

    if (
      state.bx + BALL_SIZE >= W - 20 - PADDLE_WIDTH
      && state.by + BALL_SIZE >= state.ay
      && state.by <= state.ay + PADDLE_HEIGHT
    ) {
      state.bdx = -Math.abs(state.bdx);
    }

    if (state.bx < 0 || state.bx > W) {
      state.bx = W / 2;
      state.by = H / 2;
      state.bdx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
      state.bdy = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
      state.trail.length = 0;
    }

    state.trail.push({ x: state.bx, y: state.by });
    if (state.trail.length > TRAIL) state.trail.shift();

    // ── Draw ────────────────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    // Court
    ctx.fillStyle = 'rgba(10, 5, 24, 0.55)';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(47, 35, 80, 0.9)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // 404 watermark
    ctx.font = 'bold 120px Orbitron, monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(249, 42, 173, 0.09)';
    ctx.fillText('404', W / 2, H / 2 + 42);

    // Centre line
    ctx.setLineDash([6, 14]);
    ctx.strokeStyle = 'rgba(249, 42, 173, 0.45)';
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ball trail, oldest first
    for (let i = 0; i < state.trail.length; i += 1) {
      const p = state.trail[i];
      ctx.globalAlpha = (i / state.trail.length) * 0.45;
      ctx.fillStyle = CYAN;
      ctx.fillRect(p.x, p.y, BALL_SIZE, BALL_SIZE);
    }
    ctx.globalAlpha = 1;

    // Paddles — player cyan, AI magenta
    ctx.shadowBlur = 18;
    ctx.shadowColor = CYAN;
    ctx.fillStyle = CYAN;
    ctx.fillRect(20, state.py, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.shadowColor = MAGENTA;
    ctx.fillStyle = MAGENTA;
    ctx.fillRect(W - 20 - PADDLE_WIDTH, state.ay, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Ball
    ctx.shadowColor = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(state.bx, state.by, BALL_SIZE, BALL_SIZE);
    ctx.shadowBlur = 0;

    // Score
    ctx.font = '600 18px Orbitron, monospace';
    ctx.fillStyle = GOLD;
    ctx.fillText(`${state.score}`.padStart(3, '0'), W / 2, 34);

    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = Math.min(400, Math.max(260, window.innerHeight * 0.5));
      if (stateRef.current) {
        stateRef.current.py = Math.min(stateRef.current.py, canvas.height - PADDLE_HEIGHT);
        stateRef.current.ay = Math.min(stateRef.current.ay, canvas.height - PADDLE_HEIGHT);
      }
    };
    resize();

    stateRef.current = {
      py: canvas.height / 2 - PADDLE_HEIGHT / 2,
      ay: canvas.height / 2 - PADDLE_HEIGHT / 2,
      bx: canvas.width / 2,
      by: canvas.height / 2,
      bdx: BALL_SPEED,
      bdy: BALL_SPEED,
      score: 0,
      trail: [],
    };

    const movePaddle = (clientY) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.py = Math.max(
        0,
        Math.min(canvas.height - PADDLE_HEIGHT, clientY - rect.top - PADDLE_HEIGHT / 2),
      );
    };

    const handleMouse = (e) => movePaddle(e.clientY);
    const handleTouch = (e) => movePaddle(e.touches[0].clientY);

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('resize', resize);

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Pong"
      style={{
        width: '100%',
        cursor: 'none',
        borderRadius: '10px',
        border: '1px solid var(--sw-border)',
        boxShadow: '0 0 60px -20px rgba(249, 42, 173, 0.6)',
      }}
    />
  );
}
