'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports — ssr: false for client-only components
const CurtainReveal = dynamic(() => import('@/components/ui/CurtainReveal'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });
const NoiseBg = dynamic(() => import('@/components/ui/NoiseBg'), { ssr: false });
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: false });
const StatusBar = dynamic(() => import('@/components/ui/StatusBar'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'), { ssr: false });
const EasterEgg = dynamic(() => import('@/components/sections/EasterEgg'), { ssr: false });

// Sections — Hero loads immediately, rest are lazy
import Hero from '@/components/sections/Hero';
const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Timeline = dynamic(() => import('@/components/sections/Timeline'), { ssr: false });
const Achievements = dynamic(() => import('@/components/sections/Achievements'), { ssr: false });
const Blog = dynamic(() => import('@/components/sections/Blog'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll — lightweight config
  useEffect(() => {
    let lenis: InstanceType<typeof import('lenis').default> | null = null;
    let rafId: number;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenis?.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Page entrance animation */}
      <CurtainReveal />

      {/* Global overlays */}
      <CustomCursor />
      <NoiseBg />
      <Navbar />
      <StatusBar />
      <CommandPalette />
      <EasterEgg />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Main content */}
      <main ref={mainRef}>
        <Hero />

        <div className="section-divider" />
        <About />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Projects />

        {/* Decorative full-bleed break — breaks the monotonous section rhythm */}
        <div
          style={{
            width: '100%',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(2rem, 8vw, 10%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)',
          }} />
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            ◈ EXPERIENCE · TIMELINE ◈
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)',
          }} />
        </div>

        <Timeline />

        <div className="section-divider" />
        <Achievements />

        <div className="section-divider" />
        <Blog />

        <div className="section-divider" />
        <Contact />
      </main>
    </>
  );
}
