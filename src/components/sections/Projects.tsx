'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import TextScramble from '@/components/ui/TextScramble';
import { projects } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

/* Category → gradient mapping for generative thumbnails */
const categoryGradients: Record<string, string> = {
  'AI / NLP': 'conic-gradient(from 180deg at 50% 50%, rgba(0,229,255,0.15) 0deg, rgba(123,47,255,0.2) 120deg, rgba(52,211,153,0.08) 240deg, rgba(0,229,255,0.15) 360deg)',
  'Computer Vision': 'conic-gradient(from 90deg at 40% 60%, rgba(123,47,255,0.2) 0deg, rgba(245,158,11,0.12) 120deg, rgba(0,229,255,0.15) 240deg, rgba(123,47,255,0.2) 360deg)',
};

/* Abstract pattern SVG for each category */
const categoryPatterns: Record<string, React.ReactNode> = {
  'AI / NLP': (
    <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
      {/* Neural network nodes */}
      {[40, 100, 160].map((x) =>
        [50, 100, 150].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="var(--neon-cyan)" />
        ))
      )}
      {/* Connections */}
      <line x1="40" y1="50" x2="100" y2="100" stroke="var(--neon-cyan)" strokeWidth="0.5" opacity="0.3" />
      <line x1="40" y1="100" x2="100" y2="100" stroke="var(--neon-purple)" strokeWidth="0.5" opacity="0.3" />
      <line x1="40" y1="150" x2="100" y2="100" stroke="var(--neon-cyan)" strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="100" x2="160" y2="50" stroke="var(--neon-purple)" strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="100" x2="160" y2="100" stroke="var(--neon-cyan)" strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="100" x2="160" y2="150" stroke="var(--neon-purple)" strokeWidth="0.5" opacity="0.3" />
      <line x1="40" y1="50" x2="100" y2="50" stroke="var(--neon-cyan)" strokeWidth="0.5" opacity="0.2" />
      <line x1="100" y1="50" x2="160" y2="100" stroke="var(--neon-cyan)" strokeWidth="0.5" opacity="0.2" />
      <line x1="40" y1="150" x2="100" y2="150" stroke="var(--neon-purple)" strokeWidth="0.5" opacity="0.2" />
      <line x1="100" y1="150" x2="160" y2="100" stroke="var(--neon-purple)" strokeWidth="0.5" opacity="0.2" />
    </svg>
  ),
  'Computer Vision': (
    <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
      {/* Grid/segmentation pattern */}
      {[0, 40, 80, 120, 160].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="var(--neon-purple)" strokeWidth="0.5" />
      ))}
      {[0, 40, 80, 120, 160].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="var(--neon-purple)" strokeWidth="0.5" />
      ))}
      {/* Detection boxes */}
      <rect x="20" y="20" width="60" height="50" fill="none" stroke="var(--neon-cyan)" strokeWidth="1" opacity="0.5" strokeDasharray="4,4" />
      <rect x="100" y="80" width="80" height="60" fill="none" stroke="var(--neon-green)" strokeWidth="1" opacity="0.4" strokeDasharray="4,4" />
      <rect x="40" y="120" width="50" height="50" fill="none" stroke="var(--neon-cyan)" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" />
    </svg>
  ),
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '0 clamp(2rem, 8vw, 10%)', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionLabel number="04" label="PROJECTS" />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <TextReveal
            className="section-heading"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
            }}
          >
            Selected Work
          </TextReveal>
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}
          >
            FETCH /projects HTTP/1.1
          </span>
        </div>
      </div>

      {/* Projects Container */}
      <div
        style={{
          padding: '2rem clamp(2rem, 8vw, 10%)',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }: {
  project: typeof projects[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const gradient = categoryGradients[project.category] || categoryGradients['AI / NLP'];
  const pattern = categoryPatterns[project.category] || categoryPatterns['AI / NLP'];

  return (
    <div
      className="cursor-hover-project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid var(--border-subtle)',
        borderLeft: `3px solid ${hovered ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
        background: 'var(--bg-surface)',
        padding: 0,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        boxShadow: hovered ? '0 0 30px var(--glow-cyan), inset 0 0 30px rgba(0,229,255,0.02)' : 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${index * 0.15}s`,
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
      }}>
      {/* Left: Text content */}
      <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        {/* Hover scan line */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
              animation: 'scanMove 2s ease-in-out infinite',
            }}
          />
        )}

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
            }}
          >
            [{String(index + 1).padStart(2, '0')}]
          </span>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {project.badge && (
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--neon-purple)',
                  color: 'var(--neon-purple)',
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                {project.badge}
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: 'var(--neon-cyan)',
                textTransform: 'uppercase',
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Title — with scramble effect */}
        <h3
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(1.3rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          <TextScramble text={project.title} revealDuration={800} />
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.9,
            marginBottom: '1.5rem',
            maxWidth: '700px',
          }}
        >
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            style={{ fontSize: '0.7rem', padding: '0.5rem 1rem' }}
          >
            VIEW ON GITHUB <ArrowUpRight size={12} className="cta-icon" />
          </a>
        </div>
      </div>

      {/* Right: Generative visual thumbnail */}
      <div
        style={{
          position: 'relative',
          background: gradient,
          borderLeft: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: '250px',
          transition: 'opacity 0.4s ease',
        }}
        className="project-thumbnail"
      >
        {pattern}

        {/* Animated scan line on hover */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
            top: hovered ? '100%' : '-10%',
            transition: 'top 2s ease',
            opacity: 0.5,
          }}
        />

        {/* Category label centered */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'var(--neon-cyan)',
            textTransform: 'uppercase',
            opacity: 0.5,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {project.category}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          .project-thumbnail {
            min-height: 120px !important;
            border-left: none !important;
            border-top: 1px solid var(--border-subtle) !important;
          }
        }
      `}</style>
    </div>
  );
}
