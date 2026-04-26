'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { navItems } from '@/lib/data';
import { Search, ArrowRight, Command } from 'lucide-react';

const commands = [
  { label: 'Go to Hero', section: '#hero', shortcut: '' },
  ...navItems.map(item => ({
    label: `Go to ${item.label.charAt(0) + item.label.slice(1).toLowerCase()}`,
    section: item.href,
    shortcut: '',
  })),
  { label: 'Open GitHub', section: 'https://github.com/HarshitMathur01', shortcut: '', external: true },
  { label: 'Download Resume', section: '/Resume_HarshitMathur.pdf', shortcut: '', download: true },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setActiveIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const executeCommand = useCallback((cmd: typeof commands[0]) => {
    setIsOpen(false);
    if ('external' in cmd && cmd.external) {
      window.open(cmd.section, '_blank');
    } else if ('download' in cmd && cmd.download) {
      const a = document.createElement('a');
      a.href = cmd.section;
      a.download = '';
      a.click();
    } else {
      const el = document.querySelector(cmd.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        executeCommand(filtered[activeIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="command-palette-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
    >
      <div className="command-palette">
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.25rem', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={14} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.85rem',
              padding: '1rem 0.75rem',
              outline: 'none',
            }}
          />
          <div
            style={{
              padding: '0.15rem 0.4rem',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.55rem',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-space-mono), monospace',
              whiteSpace: 'nowrap',
            }}
          >
            ESC
          </div>
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0.5rem 0' }}>
          {filtered.map((cmd, i) => (
            <div
              key={cmd.label}
              className={`command-palette-item ${i === activeIndex ? 'active' : ''}`}
              onClick={() => executeCommand(cmd)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <ArrowRight size={12} style={{ flexShrink: 0, opacity: i === activeIndex ? 1 : 0.3 }} />
              <span>{cmd.label}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                padding: '1rem 1.25rem',
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
              }}
            >
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
