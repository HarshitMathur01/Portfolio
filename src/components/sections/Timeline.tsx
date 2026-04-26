'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { experience, education } from '@/lib/data';

interface TimelineEntry {
  period: string;
  role: string;
  organization: string;
  details: string[];
  tech: string[];
  isOngoing?: boolean;
}

const timelineEntries: TimelineEntry[] = [
  {
    period: 'MAY 2025 — JULY 2025',
    role: 'ML Research Intern',
    organization: 'IIT Roorkee',
    details: experience[0].highlights,
    tech: experience[0].tech,
  },
  {
    period: '2023 → PRESENT',
    role: 'B.Tech ECE',
    organization: 'IIT (ISM) Dhanbad',
    details: [
      `CGPA: ${education[0].cgpa}`,
      `Coursework: ${education[0].coursework.join(', ')}`,
    ],
    tech: [],
    isOngoing: true,
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const handleScroll = () => {
      if (!sectionRef.current || !lineRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const progress = Math.max(0, Math.min(1,
        (viewportHeight - sectionTop) / (sectionHeight + viewportHeight * 0.3)
      ));

      setLineHeight(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) clamp(2rem, 8vw, 10%)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <SectionLabel number="05" label="TIMELINE" />

      <TextReveal
        className="section-heading"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          marginBottom: '3rem',
        }}
      >
        Experience Log
      </TextReveal>

      <div style={{ position: 'relative', paddingLeft: '3rem' }}>
        {/* Animated vertical line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '8px',
            top: 0,
            width: '2px',
            height: `${lineHeight}%`,
            background: 'linear-gradient(180deg, var(--neon-cyan), var(--neon-purple))',
            boxShadow: '0 0 10px var(--glow-cyan)',
            transition: 'height 0.1s linear',
            maxHeight: '100%',
          }}
        />

        {/* Background line (dim) */}
        <div
          style={{
            position: 'absolute',
            left: '8px',
            top: 0,
            width: '2px',
            height: '100%',
            background: 'var(--bg-elevated)',
          }}
        />

        {timelineEntries.map((entry, index) => (
          <div
            key={index}
            style={{
              marginBottom: '3rem',
              position: 'relative',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: `opacity 0.6s ease ${0.3 + index * 0.2}s, transform 0.6s ease ${0.3 + index * 0.2}s`,
            }}
          >
            {/* Node dot */}
            <div
              style={{
                position: 'absolute',
                left: '-2.6rem',
                top: '0.2rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid var(--neon-cyan)',
                background: 'var(--bg-void)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: entry.isOngoing ? 'var(--neon-green)' : 'var(--neon-cyan)',
                  boxShadow: entry.isOngoing
                    ? '0 0 8px var(--neon-green)'
                    : '0 0 8px var(--neon-cyan)',
                  animation: entry.isOngoing ? 'pulse-glow 2s ease-in-out infinite' : 'none',
                }}
              />
            </div>

            {/* Period */}
            <div
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--neon-cyan)',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>▶</span>
              <span>{entry.period}</span>
              <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            {/* Role */}
            <h3
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              {entry.role}
              <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}> @ {entry.organization}</span>
            </h3>

            {/* Details */}
            <div style={{ marginTop: '0.75rem' }}>
              {entry.details.map((detail, di) => (
                <div
                  key={di}
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 2.2,
                    paddingLeft: '1rem',
                  }}
                >
                  <span style={{ color: 'var(--neon-green)' }}>{'>'}</span> {detail}
                </div>
              ))}
            </div>

            {/* Tech tags */}
            {entry.tech.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                {entry.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            )}

            {/* Ongoing badge */}
            {entry.isOngoing && (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  border: '1px solid var(--neon-green)',
                  color: 'var(--neon-green)',
                  fontFamily: 'var(--font-space-mono), monospace',
                  textTransform: 'uppercase',
                }}
              >
                ONGOING
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
