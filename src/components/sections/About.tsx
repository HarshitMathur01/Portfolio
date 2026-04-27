'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { stats, startup } from '@/lib/data';
import Image from 'next/image';

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
        <div className="about-left">
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
            className="about-bio"
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 2,
              maxWidth: '550px',
              opacity: 1,
              transform: inView ? 'translateY(0)' : 'translateY(10px)',
              transition: 'transform 0.8s ease 0.25s',
            }}
          >
            <p>
            I’m an ECE undergraduate at IIT (ISM) Dhanbad working at the intersection of computer vision, LLMs, and real-world AI systems.
            </p>
            <p style={{ marginTop: '1rem' }}>
            I care about taking ideas beyond notebooks — designing pipelines, solving messy data problems, and shipping things that actually work.
            </p>
            <p style={{ marginTop: '1rem' }}>
            Outside of tech, I lead on the volleyball court, think competitively (600+ problems solved), and I’m currently building something of my own — MindMitra.
            
            </p>
            <p style={{ marginTop: '1.65rem' }}>
            
            </p>

          </div>

          {/* MindMitra Stealth Teaser (kept inside left column to avoid dead space) */}
          <div
            className="mindmitra-teaser"
            style={{
              marginTop: '2.5rem',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              padding: '2rem',
              maxWidth: '560px',
              opacity: 1,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transition: 'transform 0.8s ease 0.4s',
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
                  whiteSpace: 'nowrap',
                }}
              >
                [STEALTH]
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stats Grid */}
        <div className="about-right">
          {/* Portrait card */}
          <div
            className="about-portrait card-surface"
            style={{
              position: 'relative',
              overflow: 'hidden',
              opacity: 1,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transition: 'transform 0.8s ease 0.15s',
            }}
          >
            <div className="scanline-overlay" />
            <div className="about-portrait-media">
              <Image
                src="/photo-hm.jpg"
                alt="Harshit Mathur"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
                style={{
                  objectFit: 'cover',
                  objectPosition: '50% 35%',
                  filter: 'saturate(0.9) contrast(1.08)',
                  opacity: 0.92,
                }}
              />
              <div className="about-portrait-tint" />
              <div className="about-portrait-vignette" />
            </div>

            {/* Subtle corner label */}
            <div
              style={{
                position: 'absolute',
                left: '0.9rem',
                bottom: '0.9rem',
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                background: 'rgba(2, 4, 8, 0.55)',
                border: '1px solid var(--border-subtle)',
                padding: '0.35rem 0.55rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              ID: HM // SIGNAL OK
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className="about-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
              opacity: 1,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transition: 'transform 0.8s ease 0.2s',
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
      </div>

      <style jsx>{`
        .about-left {
          display: flex;
          flex-direction: column;
        }

        .about-right {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-portrait {
          border-color: rgba(0, 229, 255, 0.15);
          box-shadow: 0 0 24px rgba(0, 229, 255, 0.06);
        }

        .about-portrait-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          max-height: 460px;
          background: radial-gradient(ellipse at 30% 20%, rgba(0, 229, 255, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 65%, rgba(123, 47, 255, 0.06) 0%, transparent 60%),
            var(--bg-elevated);
        }

        .about-portrait-tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 229, 255, 0.08) 0%,
            rgba(123, 47, 255, 0.06) 55%,
            rgba(2, 4, 8, 0.35) 100%
          );
          mix-blend-mode: color;
          pointer-events: none;
        }

        .about-portrait-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(2, 4, 8, 0.55) 100%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .about-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .mindmitra-teaser {
            max-width: none !important;
          }

          .about-portrait-media {
            max-height: none;
          }
        }
      `}</style>
    </section>
  );
}
