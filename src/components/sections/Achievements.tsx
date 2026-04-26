'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { achievements } from '@/lib/data';

const typeColors: Record<string, string> = {
  SUCCESS: 'var(--neon-green)',
  STATUS: 'var(--neon-cyan)',
  TROPHY: '#ffab00',
};

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= achievements.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) clamp(2rem, 8vw, 10%)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <SectionLabel number="06" label="LOGS" />

      <TextReveal
        className="section-heading"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          marginBottom: '2.5rem',
        }}
      >
        System Logs
      </TextReveal>

      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              marginLeft: '0.5rem',
              letterSpacing: '0.1em',
            }}
          >
            harshit@achievements:~$
          </span>
        </div>

        {/* Log entries */}
        {achievements.map((ach, index) => (
          <div
            key={index}
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.85rem',
              lineHeight: 2.2,
              opacity: index < visibleCount ? 1 : 0,
              transform: index < visibleCount ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                color: typeColors[ach.type],
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                fontSize: '0.75rem',
              }}
            >
              [{ach.type}]
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {ach.text}
            </span>
          </div>
        ))}

        {/* Blinking cursor at the end */}
        {visibleCount >= achievements.length && (
          <div
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.95rem',
              color: 'var(--neon-green)',
              marginTop: '0.5rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>harshit@achievements:~$</span>
            <span style={{ animation: 'blink 1s infinite', marginLeft: '0.5rem' }}>▋</span>
          </div>
        )}
      </div>
    </section>
  );
}
