'use client';

import { useEffect, useState, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

interface MatrixDrop {
  x: number;
  speed: number;
  delay: number;
  chars: string[];
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 16);
    const drops: MatrixDrop[] = Array.from({ length: columns }, (_, i) => ({
      x: i * 16,
      speed: Math.random() * 3 + 1,
      delay: Math.random() * 500,
      chars: Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
    }));

    const yPositions = new Float32Array(columns).fill(-50);
    let startTime = Date.now();

    const draw = () => {
      const elapsed = Date.now() - startTime;

      ctx.fillStyle = 'rgba(2, 4, 8, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px monospace';

      drops.forEach((drop, i) => {
        if (elapsed < drop.delay) return;

        yPositions[i] += drop.speed;

        drop.chars.forEach((char, j) => {
          const y = yPositions[i] - j * 16;
          if (y < 0 || y > canvas.height) return;

          const opacity = j === 0 ? 1 : Math.max(0, 1 - j * 0.08);
          const color = j === 0 ? '#39ff14' : `rgba(0, 229, 255, ${opacity * 0.6})`;
          ctx.fillStyle = color;
          ctx.fillText(char, drop.x, y);
        });

        if (yPositions[i] > canvas.height + 400) {
          yPositions[i] = -50;
          drop.speed = Math.random() * 3 + 1;
          drop.chars = Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      });
    };

    const interval = setInterval(draw, 33);

    // Start fadeout after 1.8s
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    // Remove after fade
    const removeTimer = setTimeout(() => setVisible(false), 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="preloader"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Center text */}
      <div
        style={{
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--neon-cyan)',
            letterSpacing: '0.2em',
            marginBottom: '0.5rem',
          }}
        >
          HM
        </div>
        <div
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.6rem',
            color: 'var(--neon-green)',
            letterSpacing: '0.2em',
            animation: 'blink 1s infinite',
          }}
        >
          INITIALIZING SYSTEM...
        </div>
      </div>
    </div>
  );
}
