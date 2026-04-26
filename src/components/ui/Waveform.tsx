'use client';

import { useEffect, useRef } from 'react';

/**
 * Waveform — SVG oscillating waveform animation.
 * Lightweight alternative to canvas — uses SVG path animation.
 * Pauses when not in viewport.
 */
export default function Waveform({
  width = 120,
  height = 32,
  color = 'var(--neon-cyan)',
  bars = 24,
  style = {},
}: {
  width?: number;
  height?: number;
  color?: string;
  bars?: number;
  style?: React.CSSProperties;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const barsRef = useRef<SVGRectElement[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(svg);

    const barWidth = (width - bars) / bars;
    let time = 0;

    const animate = () => {
      if (isVisible) {
        time += 0.04;
        barsRef.current.forEach((bar, i) => {
          if (!bar) return;
          const h = (Math.sin(time * 2 + i * 0.5) * 0.35 + 0.5) * height * 0.7;
          bar.setAttribute('y', String(height / 2 - h / 2));
          bar.setAttribute('height', String(Math.max(2, h)));
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [bars, height, width]);

  const barWidth = (width - bars) / bars;

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <rect
          key={i}
          ref={(el) => { if (el) barsRef.current[i] = el; }}
          x={i * (barWidth + 1)}
          y={height / 2 - 1}
          width={barWidth}
          height={2}
          rx={1}
          fill={color}
          opacity={0.6}
        />
      ))}
    </svg>
  );
}
