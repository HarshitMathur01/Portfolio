'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Waveform from '@/components/ui/Waveform';
import { personal } from '@/lib/data';
import { ExternalLink, Link as LinkIcon, Mail, Code, Award, ArrowUpRight, Send } from 'lucide-react';

const socialLinks = [
  { label: 'GitHub', href: personal.links.github, icon: ExternalLink, desc: 'Code' },
  { label: 'LinkedIn', href: personal.links.linkedin, icon: LinkIcon, desc: 'Connect' },
  { label: 'Kaggle', href: personal.links.kaggle, icon: Award, desc: 'Compete' },
  { label: 'Codeforces', href: personal.links.codeforces, icon: Code, desc: 'Solve' },
  { label: 'Email', href: personal.links.email, icon: Mail, desc: 'Write' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top decorative border — visual separator */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 5%, var(--neon-cyan) 50%, transparent 95%)',
          opacity: 0.15,
        }}
      />

      {/* Main content area */}
      <div
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 8vw, 10%)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <SectionLabel number="08" label="SIGNAL" />

        {/* Hero-sized heading */}
        <div
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              maxWidth: '800px',
            }}
          >
            LET&apos;S<br />
            BUILD<br />
            <span style={{
              color: 'var(--neon-cyan)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              SOMETHING.
              <Waveform width={80} height={24} bars={16} style={{ opacity: 0.5 }} />
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              maxWidth: '500px',
            }}
          >
            Whether it&apos;s research, a project, a startup collab, or just a good conversation — I&apos;m open.
          </p>
        </div>

        {/* Two-column: Form + Social links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left: Terminal form */}
          <div
            style={{
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Terminal header bar */}
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
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  marginLeft: '0.5rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                ─ establish connection ─
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.75rem',
                    color: 'var(--neon-cyan)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {'>'} name:
                </label>
                <input
                  type="text"
                  className="terminal-input"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.75rem',
                    color: 'var(--neon-cyan)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {'>'} email:
                </label>
                <input
                  type="email"
                  className="terminal-input"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.75rem',
                    color: 'var(--neon-cyan)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {'>'} message:
                </label>
                <textarea
                  className="terminal-input"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  placeholder="Type your message..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="cta-button"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1rem',
                  fontSize: '0.8rem',
                }}
              >
                {submitted ? '✓ TRANSMISSION SENT' : (
                  <>
                    SEND TRANSMISSION <Send size={14} className="cta-icon" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Social links grid */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              OPEN CHANNELS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-hover-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      textDecoration: 'none',
                      transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.2s ease',
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(20px)',
                      transitionDelay: `${0.4 + i * 0.08}s`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                      e.currentTarget.style.transform = 'translateX(6px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = 'var(--bg-surface)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--neon-cyan)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-syne), sans-serif',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {link.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-space-mono), monospace',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem',
                        }}
                      >
                        {link.desc}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      style={{
                        color: 'var(--text-muted)',
                        flexShrink: 0,
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Availability status */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem 1.25rem',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                background: 'rgba(0, 229, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.8s ease 0.8s',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--neon-green)',
                  boxShadow: '0 0 8px var(--neon-green)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Available for opportunities
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.2rem',
                  }}
                >
                  Research · Internships · Collaborations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — full-width with visual closure */}
      <footer
        className="site-footer"
        style={{
          borderTop: '1px solid var(--border-subtle)',
          background: 'linear-gradient(180deg, rgba(8, 13, 20, 0.0) 0%, rgba(8, 13, 20, 0.55) 40%, rgba(8, 13, 20, 0.75) 100%)',
          padding: 'clamp(2rem, 4vw, 3rem) var(--page-x-padding)',
        }}
      >
        <div
          className="site-footer-inner"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {/* Left: Copyright */}
          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            © {new Date().getFullYear()} HARSHIT MATHUR
          </p>

          {/* Center: Built with */}
          <p
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.65rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
            }}
          >
            NEXT.JS + THREE.JS + GSAP
          </p>

          {/* Right: Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.7rem',
              color: 'var(--neon-cyan)',
              background: 'none',
              border: '1px solid var(--border-subtle)',
              padding: '0.5rem 1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--neon-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            ↑ TOP
          </button>
        </div>
      </footer>

      <style jsx>{`
        .site-footer-inner {
          border: 1px solid rgba(0, 229, 255, 0.08);
          background: rgba(2, 4, 8, 0.35);
          padding: 1.1rem 1.25rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .site-footer-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
