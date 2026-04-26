'use client';

import { useEffect, useState, useRef } from 'react';
import { navItems } from '@/lib/data';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(12px)',
          backgroundColor: scrolled ? 'rgba(2, 4, 8, 0.85)' : 'rgba(2, 4, 8, 0.5)',
          borderBottom: scrolled ? '1px solid var(--neon-cyan)' : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.5s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '1.2rem',
            color: 'var(--neon-cyan)',
            textDecoration: 'none',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
          }}
        >
          HM<span className="cursor-blink" />
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="nav-desktop"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Available pill */}
          <div
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              border: '1px solid var(--neon-cyan)',
              fontFamily: 'var(--font-space-mono), monospace',
              textTransform: 'uppercase',
              animation: 'pulse-cyan 2s ease-in-out infinite',
              whiteSpace: 'nowrap',
            }}
          >
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--neon-cyan)',
            padding: '0.5rem',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                opacity: 0,
                animation: `fadeSlideIn 0.4s ease forwards ${i * 0.08}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
