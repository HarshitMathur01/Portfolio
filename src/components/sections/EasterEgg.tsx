'use client';

import { useEffect, useState, useCallback } from 'react';
import { funFacts } from '@/lib/data';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Konami code detection
  useEffect(() => {
    let sequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return;

      sequence.push(e.code);
      if (sequence.length > KONAMI_CODE.length) {
        sequence = sequence.slice(-KONAMI_CODE.length);
      }

      if (JSON.stringify(sequence) === JSON.stringify(KONAMI_CODE)) {
        setIsOpen(true);
        sequence = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Type lines when opened
  useEffect(() => {
    if (!isOpen) return;

    const allLines = [
      'HARSHIT OS v2.0.25 — UNAUTHORIZED ACCESS',
      '──────────────────────────────────────────',
      '> Scanning user...',
      '> Identity: [REDACTED]',
      '> Clearance level: GRANTED',
      '',
      'Fun facts loading...',
      '',
      ...funFacts.map((fact, i) => `[${String(i + 1).padStart(2, '0')}] ${fact}`),
      '',
      '> CONNECTION ESTABLISHED',
      '> Type \'exit\' to return to normal mode.',
      '',
    ];

    let index = 0;
    setLines([]);

    const interval = setInterval(() => {
      if (index < allLines.length) {
        setLines(prev => [...prev, allLines[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    setLines([]);
    setTypingComplete(false);
    setInputValue('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().toLowerCase() === 'exit') {
      closeTerminal();
    } else {
      setLines(prev => [...prev, `> ${inputValue}`, `Command not found: ${inputValue}. Try 'exit'.`]);
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="konami-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTerminal();
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          padding: '1.5rem',
          background: 'rgba(0, 0, 0, 0.95)',
          boxShadow: '0 0 40px rgba(57, 255, 20, 0.1)',
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid rgba(57, 255, 20, 0.15)',
          }}
        >
          <div
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }}
            onClick={closeTerminal}
          />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ fontSize: '0.65rem', color: 'rgba(57, 255, 20, 0.4)', marginLeft: '0.5rem' }}>
            harshit-os — bash — 80×24
          </span>
        </div>

        {/* Lines */}
        {lines.map((line, i) => (
          <div key={i} style={{ minHeight: '1.2em', whiteSpace: 'pre-wrap' }}>
            {line}
          </div>
        ))}

        {/* Input */}
        {typingComplete && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ color: 'rgba(57, 255, 20, 0.6)' }}>harshit@portfolio:~$</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#39ff14',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                flex: 1,
                caretColor: '#39ff14',
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
}
