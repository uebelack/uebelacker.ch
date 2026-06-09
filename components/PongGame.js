import React, { useEffect, useRef, useCallback } from 'react';

const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 10;
const BALL_SPEED = 4;
const AI_SPEED = 3;

export default function PongGame() {
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const state = canvas._pongState;
    if (!state) return;

    // Update ball
    state.bx += state.bdx;
    state.by += state.bdy;

    // Top/bottom bounce
    if (state.by <= 0 || state.by >= H - BALL_SIZE) {
      state.bdy = -state.bdy;
    }

    // Player paddle collision
    if (
      state.bx <= 20 + PADDLE_WIDTH
      && state.by + BALL_SIZE >= state.py
      && state.by <= state.py + PADDLE_HEIGHT
    ) {
      state.bdx = Math.abs(state.bdx);
      state.score++;
    }

    // AI paddle
    const aiCenter = state.ay + PADDLE_HEIGHT / 2;
    const ballCenter = state.by + BALL_SIZE / 2;
    if (aiCenter < ballCenter) state.ay += AI_SPEED;
    if (aiCenter > ballCenter) state.ay -= AI_SPEED;
    state.ay = Math.max(0, Math.min(H - PADDLE_HEIGHT, state.ay));

    // AI paddle collision
    if (
      state.bx + BALL_SIZE >= W - 20 - PADDLE_WIDTH
      && state.by + BALL_SIZE >= state.ay
      && state.by <= state.ay + PADDLE_HEIGHT
    ) {
      state.bdx = -Math.abs(state.bdx);
    }

    // Reset ball if out
    if (state.bx < 0 || state.bx > W) {
      state.bx = W / 2;
      state.by = H / 2;
      state.bdx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
      state.bdy = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    }

    // Draw
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const fg = isDark ? '#ffffff' : '#000000';

    ctx.clearRect(0, 0, W, H);

    // Dashed center line
    ctx.setLineDash([5, 15]);
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Paddles
    ctx.fillStyle = fg;
    ctx.fillRect(20, state.py, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(W - 20 - PADDLE_WIDTH, state.ay, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Ball
    ctx.fillRect(state.bx, state.by, BALL_SIZE, BALL_SIZE);

    // Score
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${state.score}`, W / 2, 30);

    // 404 watermark
    ctx.font = 'bold 120px monospace';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    ctx.fillText('404', W / 2, H / 2 + 40);

    state.raf = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = Math.min(400, window.innerHeight * 0.5);
    };
    resize();

    canvas._pongState = {
      py: canvas.height / 2 - PADDLE_HEIGHT / 2,
      ay: canvas.height / 2 - PADDLE_HEIGHT / 2,
      bx: canvas.width / 2,
      by: canvas.height / 2,
      bdx: BALL_SPEED,
      bdy: BALL_SPEED,
      score: 0,
      raf: null,
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      canvas._pongState.py = Math.max(
        0,
        Math.min(canvas.height - PADDLE_HEIGHT, e.clientY - rect.top - PADDLE_HEIGHT / 2),
      );
    };

    const handleTouch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      canvas._pongState.py = Math.max(
        0,
        Math.min(canvas.height - PADDLE_HEIGHT, touch.clientY - rect.top - PADDLE_HEIGHT / 2),
      );
    };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('resize', resize);

    canvas._pongState.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(canvas._pongState.raf);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('resize', resize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', cursor: 'none', borderRadius: '8px' }}
    />
  );
}
