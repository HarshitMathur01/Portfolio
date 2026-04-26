'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { blogPosts } from '@/lib/data';



export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) clamp(2rem, 8vw, 10%)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <SectionLabel number="07" label="TRANSMISSIONS" />

      <TextReveal
        className="section-heading"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          marginBottom: '0.75rem',
        }}
      >
        Transmissions
      </TextReveal>

      <p
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          marginBottom: '2.5rem',
        }}
      >
        [DRAFTS IN PROGRESS — PUBLISHING SOON]
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {blogPosts.map((post, index) => (
          <article
            key={post.slug}
            className="card-surface cursor-hover-link"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease`,
              minHeight: '220px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Draft indicator */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.55rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid var(--border-subtle)',
                padding: '0.15rem 0.5rem',
              }}
            >
              DRAFT
            </div>

            <div>
              {/* Date */}
              <time
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginTop: '0.75rem',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '1rem',
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <div>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(0, 229, 255, 0.2)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-space-mono), monospace',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read link */}
              <span
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.1em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  cursor: 'default',
                  userSelect: 'none',
                }}
              >
                READ SOON
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
