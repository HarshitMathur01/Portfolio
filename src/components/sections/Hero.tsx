'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { personal } from '@/lib/data';
import GlitchText from '@/components/ui/GlitchText';
import TerminalText from '@/components/ui/TerminalText';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, ExternalLink, Download, ChevronDown } from 'lucide-react';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(123,47,255,0.04) 0%, transparent 60%)',
    }} />
  ),
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [animStage, setAnimStage] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setAnimStage(1), 400));  // name appears
    timers.push(setTimeout(() => setAnimStage(2), 1000)); // tagline
    timers.push(setTimeout(() => setAnimStage(3), 1300)); // bio starts typing
    timers.push(setTimeout(() => setAnimStage(4), 1600)); // CTAs
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Canvas Background */}
      <HeroCanvas />

      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Corner coordinate */}
      <div
        style={{
          position: 'absolute',
          top: '6rem',
          left: '2rem',
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.65rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          zIndex: 5,
        }}
      >
        [00:00 — INIT SEQUENCE]
      </div>

      {/* GHOST DECORATIVE ELEMENT — fills the dead right side */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(2rem, 8vw, 10%)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(8rem, 18vw, 22rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0, 229, 255, 0.04)',
          lineHeight: 0.85,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: mounted && animStage >= 1 ? 1 : 0,
          transition: 'opacity 2s ease 0.5s',
        }}
      >
        {'</>'}
      </div>

      {/* Decorative vertical line on right */}
      <div
        style={{
          position: 'absolute',
          right: '4rem',
          top: '15%',
          height: '70%',
          width: '1px',
          background: 'linear-gradient(180deg, transparent, rgba(0, 229, 255, 0.08), transparent)',
          zIndex: 1,
          display: 'none', // hidden on mobile via media query
        }}
        className="hero-decoration"
      />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          padding: '0 clamp(2rem, 8vw, 10%)',
          maxWidth: '1400px',
        }}
      >
        {/* Sub-tag */}
        <div
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: 'var(--neon-cyan)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: mounted && animStage >= 1 ? 1 : 0,
            transform: mounted && animStage >= 1 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {personal.subTagline}
        </div>

        {/* Hero Name */}
        <h1 className="hero-heading" style={{ fontFamily: 'var(--font-syne), sans-serif', marginBottom: '0.5rem' }}>
          <span
            style={{
              display: 'block',
              opacity: mounted && animStage >= 1 ? 1 : 0,
              transform: mounted && animStage >= 1 ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            <GlitchText text="HARSHIT" triggerOnMount />
          </span>
          <span
            style={{
              display: 'block',
              opacity: mounted && animStage >= 1 ? 1 : 0,
              transform: mounted && animStage >= 1 ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            <GlitchText text="MATHUR" triggerOnMount />
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            maxWidth: '600px',
            lineHeight: 1.5,
            opacity: mounted && animStage >= 2 ? 1 : 0,
            transform: mounted && animStage >= 2 ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {personal.tagline}
        </p>

        {/* Bio — Terminal Text */}
        <div
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            minHeight: '4rem',
            opacity: mounted && animStage >= 3 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span style={{ color: 'var(--neon-green)', marginRight: '0.5rem', fontWeight: 500 }}>{'>'}</span>
          <TerminalText
            text={personal.bio}
            speed={15}
            startTyping={animStage >= 3}
          />
        </div>

        {/* CTA Buttons — with magnetic hover */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            opacity: mounted && animStage >= 4 ? 1 : 0,
            transform: mounted && animStage >= 4 ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <MagneticButton strength={0.25}>
            <a href="#projects" className="cta-button" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              VIEW WORK <ArrowUpRight size={14} className="cta-icon" />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="cta-button">
              GITHUB <ExternalLink size={14} className="cta-icon" />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a href="/Resume_HarshitMathur.pdf" download className="cta-button">
              DOWNLOAD RESUME <Download size={14} className="cta-icon" />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator — right edge */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          bottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 5,
          opacity: mounted && animStage >= 4 ? 0.5 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <span
          style={{
            writingMode: 'vertical-lr',
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        <ChevronDown
          size={14}
          style={{
            color: 'var(--text-muted)',
            animation: 'scroll-arrow 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Bottom control panel readout */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '2rem',
          display: 'flex',
          gap: '1.5rem',
          zIndex: 5,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.6rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
            }}
          >
            [{String(i).padStart(2, '0')}]
          </span>
        ))}
      </div>
    </section>
  );
}
