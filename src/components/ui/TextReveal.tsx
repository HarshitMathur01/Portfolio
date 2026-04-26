'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * TextReveal — Word-by-word scroll-triggered text reveal.
 * Each word slides up from below with a stagger, creating an "alive" feeling.
 * Uses CSS clip-path for hardware-accelerated animation.
 */
export default function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  stagger = 50,
  style = {},
}: {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: inView ? 'translateY(0)' : 'translateY(110%)',
              opacity: inView ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, opacity 0.4s ease ${i * stagger}ms`,
              willChange: 'transform',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
