'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const GLYPHS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▄▀▐▌■□▢▣▤▥▧▨▩';

/**
 * TextScramble — Sci-fi "decryption" effect.
 * Characters cycle through random glyphs before settling into the final text.
 * Triggers on scroll into view.
 */
export default function TextScramble({
  text,
  className = '',
  as: Tag = 'span',
  style = {},
  speed = 30,
  revealDuration = 600,
  triggerOnMount = false,
}: {
  text: string;
  className?: string;
  as?: 'h2' | 'h3' | 'span' | 'div';
  style?: React.CSSProperties;
  speed?: number;
  revealDuration?: number;
  triggerOnMount?: boolean;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState(triggerOnMount ? '' : text);
  const [hasTriggered, setHasTriggered] = useState(false);
  const frameRef = useRef<number>(0);

  const scramble = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);

    const chars = text.split('');
    const totalDuration = revealDuration;
    const startTime = performance.now();
    const charDelay = totalDuration / chars.length; // ms per character lock-in

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const lockedCount = Math.floor(progress * chars.length);

      let result = '';
      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') {
          result += ' ';
        } else if (i < lockedCount) {
          result += chars[i]; // locked in
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [text, hasTriggered, revealDuration]);

  useEffect(() => {
    if (triggerOnMount) {
      const timer = setTimeout(scramble, 200);
      return () => clearTimeout(timer);
    }

    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) scramble(); },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [scramble, triggerOnMount]);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{
        ...style,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {displayText || text}
    </Tag>
  );
}
