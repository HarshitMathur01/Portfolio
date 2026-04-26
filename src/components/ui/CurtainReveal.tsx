'use client';

import { useEffect, useState } from 'react';

/**
 * CurtainReveal — CSS-only page entrance animation.
 * Two panels slide apart to reveal the content beneath.
 * Auto-removes from DOM after animation completes.
 * Zero JS computation — pure CSS transform.
 */
export default function CurtainReveal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'flex',
      }}
    >
      {/* Left panel */}
      <div
        style={{
          flex: 1,
          background: 'var(--bg-void)',
          animation: 'curtainLeft 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.3s forwards',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: 'var(--neon-cyan)',
            opacity: 0.6,
            animation: 'curtainTextFade 0.3s ease 0.2s forwards',
          }}
        >
          INITIALIZING
        </span>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          background: 'var(--bg-void)',
          animation: 'curtainRight 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.3s forwards',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: 'var(--neon-cyan)',
            opacity: 0.6,
            animation: 'curtainTextFade 0.3s ease 0.2s forwards',
          }}
        >
          SYSTEM
        </span>
      </div>

      {/* Center line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '1px',
          height: '100%',
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 15px var(--neon-cyan)',
          opacity: 0.6,
          animation: 'curtainLineFade 0.3s ease 0.3s forwards',
          transform: 'translateX(-50%)',
        }}
      />

      <style jsx>{`
        @keyframes curtainLeft {
          to { transform: translateX(-100%); }
        }
        @keyframes curtainRight {
          to { transform: translateX(100%); }
        }
        @keyframes curtainTextFade {
          to { opacity: 0; }
        }
        @keyframes curtainLineFade {
          to { opacity: 0; transform: translateX(-50%) scaleY(0); }
        }
      `}</style>
    </div>
  );
}
