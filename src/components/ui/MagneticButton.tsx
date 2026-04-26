'use client';

import { useRef, useCallback } from 'react';

/**
 * MagneticButton — Wrapper that makes children "pull" toward the cursor.
 * The signature Awwwards micro-interaction.
 * Uses CSS transform only — no layout thrashing.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  style = {},
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
