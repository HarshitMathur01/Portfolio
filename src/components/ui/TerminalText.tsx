'use client';

import { useEffect, useState, useRef } from 'react';

interface TerminalTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  startTyping?: boolean;
}

export default function TerminalText({
  text,
  speed = 30,
  delay = 0,
  className = '',
  showCursor = true,
  cursorChar = '▋',
  onComplete,
  startTyping = true,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!startTyping) return;

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, startTyping]);

  useEffect(() => {
    if (!hasStarted) return;

    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && hasStarted && (
        <span
          style={{
            color: 'var(--neon-cyan)',
            animation: 'blink 1s infinite',
            marginLeft: '2px',
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
