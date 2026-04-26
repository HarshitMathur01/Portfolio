'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor — optimized version.
 * Uses event delegation for hover detection (no MutationObserver).
 * Initializes visible since the mouse is typically already in the viewport.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true to avoid flash

  // Spring physics for ring (manual, no framer-motion overhead)
  const ringPos = useRef({ x: -100, y: -100 });
  const ringTarget = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const hoverState = useRef<'default' | 'link' | 'project'>('default');

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Make cursor visible once first mouse movement is detected
    let hasMovedOnce = false;

    // --- Cursor movement (throttled via rAF) ---
    let mouseX = 0, mouseY = 0;
    let ticking = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Show cursor on first movement
      if (!hasMovedOnce) {
        hasMovedOnce = true;
        dot.style.opacity = '1';
        ring.style.opacity = '0.8';
      }

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
          ringTarget.current.x = mouseX - 18;
          ringTarget.current.y = mouseY - 18;
          ticking = false;
        });
      }
    };

    // --- Hover detection via event delegation (no MutationObserver) ---
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('a, button, [role="button"], .cursor-hover-link, .cursor-hover-project, input, textarea, select, label');
      if (!el) {
        if (hoverState.current !== 'default') {
          hoverState.current = 'default';
          updateRingStyle(ring, dot, 'default');
        }
        return;
      }
      if (el.classList.contains('cursor-hover-project')) {
        hoverState.current = 'project';
        updateRingStyle(ring, dot, 'project');
      } else {
        hoverState.current = 'link';
        updateRingStyle(ring, dot, 'link');
      }
    };

    // --- Spring loop for ring (one rAF, lightweight lerp) ---
    const springLoop = () => {
      const ease = 0.12;
      ringPos.current.x += (ringTarget.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (ringTarget.current.y - ringPos.current.y) * ease;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      rafRef.current = requestAnimationFrame(springLoop);
    };

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => {
      if (hasMovedOnce) { dot.style.opacity = '1'; ring.style.opacity = '0.8'; }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(springLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot — 8px cyan circle that follows the cursor instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--neon-cyan)',
          boxShadow: '0 0 6px var(--neon-cyan), 0 0 12px rgba(0, 229, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Ring — 36px trailing ring with spring physics */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid var(--neon-cyan)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}

function updateRingStyle(ring: HTMLDivElement, dot: HTMLDivElement, state: 'default' | 'link' | 'project') {
  if (state === 'default') {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.border = '1.5px solid var(--neon-cyan)';
    ring.style.backgroundColor = 'transparent';
    dot.style.width = '8px';
    dot.style.height = '8px';
  } else if (state === 'link') {
    ring.style.width = '48px';
    ring.style.height = '48px';
    ring.style.border = '1px solid rgba(0, 229, 255, 0.3)';
    ring.style.backgroundColor = 'rgba(0, 229, 255, 0.06)';
    dot.style.width = '6px';
    dot.style.height = '6px';
  } else {
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.border = 'none';
    ring.style.backgroundColor = 'rgba(0, 229, 255, 0.08)';
    dot.style.width = '4px';
    dot.style.height = '4px';
  }
}
