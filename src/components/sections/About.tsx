'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { stats, startup } from '@/lib/data';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function CountUp({ target, decimals = 0, suffix = '', duration = 2000, inView }: {
  target: number; decimals?: number; suffix?: string; duration?: number; inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      // Delay 500ms to ensure section is fully visible before animating
      const delayTimer = setTimeout(() => {
        setStarted(true);
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(interval);
          } else {
            setCount(current);
          }
        }, duration / steps);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(delayTimer);
    }
  }, [inView, started, target, duration]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<HTMLElement>, 0.2);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setProgressWidth(55), 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) clamp(2rem, 8vw, 10%)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <SectionLabel number="02" label="PROFILE" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left: Quote + Bio */}
        <div>
          <TextReveal
            as="p"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'var(--text-primary)',
              marginBottom: '2rem',
              borderLeft: '3px solid var(--neon-cyan)',
              paddingLeft: '1.5rem',
            }}
          >
            {"\u201CI don\u2019t just train models \u2014 I build the systems they live in.\u201D"}
          </TextReveal>

          <div
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 2,
              maxWidth: '550px',
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.8s ease 0.3s',
            }}
          >
            <p>
              ECE student at IIT (ISM) Dhanbad (CGPA 8.91). Researcher at IIT Roorkee.
              Passionate about computer vision, LLMs, and shipping products that matter.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Also: Volleyball team captain, competitive programmer (500+ problems),
              and currently building a startup (MindMitra — stay tuned).
            </p>
          </div>
        </div>

        {/* Right: Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-surface)',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-surface)'}
            >
              <div
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--neon-cyan)',
                  marginBottom: '0.25rem',
                }}
              >
                <CountUp
                  target={stat.value}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix || ''}
                  inView={inView}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MindMitra Stealth Teaser */}
      <div
        style={{
          marginTop: '4rem',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          padding: '2rem',
          maxWidth: '500px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle animated border glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)',
            animation: 'scanMove 4s ease-in-out infinite',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span
            style={{
              fontSize: '1.2rem',
              animation: 'pulse-cyan 2s ease-in-out infinite',
              display: 'inline-block',
            }}
          >
            ◈
          </span>
          <span
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.1em',
            }}
          >
            {startup.name.toUpperCase()}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}
        >
          AI-powered mental health platform for youth. Building the infrastructure for emotional intelligence at scale.
        </p>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              flex: 1,
              height: '4px',
              background: 'var(--bg-elevated)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressWidth}%`,
                background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))',
                transition: 'width 2s ease',
                borderRadius: '2px',
                boxShadow: '0 0 10px var(--glow-purple)',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: 'var(--neon-purple)',
              textTransform: 'uppercase',
            }}
          >
            [STEALTH]
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
