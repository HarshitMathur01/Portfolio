'use client';

import { useEffect, useRef, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean;
  duration?: number;
}

export default function GlitchText({
  text,
  className = '',
  triggerOnMount = false,
  triggerOnHover = false,
  duration = 300,
}: GlitchTextProps) {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (triggerOnMount) {
      const delay = setTimeout(() => {
        setIsActive(true);
        timeoutRef.current = setTimeout(() => setIsActive(false), duration);
      }, 800);
      return () => {
        clearTimeout(delay);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [triggerOnMount, duration]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isActive) {
      setIsActive(true);
      timeoutRef.current = setTimeout(() => setIsActive(false), duration);
    }
  };

  return (
    <span
      className={`glitch ${isActive ? 'active' : ''} ${className}`}
      data-text={text}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
  );
}
