'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import TextReveal from '@/components/ui/TextReveal';
import { skills } from '@/lib/data';

interface SkillNode {
  name: string;
  category: string;
  x: number;
  y: number;
}

const categoryColors: Record<string, string> = {
  'AI/ML': '#00e5ff',
  'Frameworks': '#7b2fff',
  'Languages': '#34d399',
  'Libraries': '#f59e0b',
  'Tools': '#818cf8',
  'Concepts': '#00e5ff',
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const nodesRef = useRef<SkillNode[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  const allSkills = useMemo(() => {
    const result: SkillNode[] = [];
    const categories = Object.entries(skills);

    categories.forEach(([category, items], catIdx) => {
      const angleOffset = (catIdx / categories.length) * Math.PI * 2;
      const radius = 0.28;

      items.forEach((item, itemIdx) => {
        const itemAngle = angleOffset + (itemIdx - items.length / 2) * 0.15;
        const itemRadius = radius + (itemIdx % 2 === 0 ? 0.05 : -0.03);

        result.push({
          name: item,
          category,
          x: 0.5 + Math.cos(itemAngle) * itemRadius,
          y: 0.5 + Math.sin(itemAngle) * itemRadius,
        });
      });
    });

    return result;
  }, []);

  // Pre-compute static connections once — avoids O(n²) check every frame
  const staticConnections = useMemo(() => {
    const conns: { i: number; j: number; sameCat: boolean }[] = [];
    for (let i = 0; i < allSkills.length; i++) {
      for (let j = i + 1; j < allSkills.length; j++) {
        const dx = allSkills[i].x - allSkills[j].x;
        const dy = allSkills[i].y - allSkills[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sameCat = allSkills[i].category === allSkills[j].category;
        const maxDist = sameCat ? 0.25 : 0.12;
        if (dist < maxDist) {
          conns.push({ i, j, sameCat });
        }
      }
    }
    return conns;
  }, [allSkills]);

  // IntersectionObserver for initial reveal AND for pausing animation when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0, rootMargin: '100px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    nodesRef.current = allSkills;

    let time = 0;
    const draw = () => {
      // Don't render if the section is off-screen
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Draw pre-computed connections (no O(n²) per frame)
      staticConnections.forEach(({ i, j }) => {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const isHovered = hoveredSkill === nodeA.name || hoveredSkill === nodeB.name;
        const opacity = isHovered ? 0.35 : 0.1;

        ctx.beginPath();
        ctx.moveTo(nodeA.x * w, nodeA.y * h);
        ctx.lineTo(nodeB.x * w, nodeB.y * h);
        ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
        ctx.lineWidth = isHovered ? 1.5 : 0.5;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const nx = node.x * w + Math.sin(time + node.x * 10) * 2;
        const ny = node.y * h + Math.cos(time + node.y * 10) * 2;
        const isHovered = hoveredSkill === node.name;
        const color = categoryColors[node.category] || '#00e5ff';
        const radius = isHovered ? 6 : 3.5;

        // Glow only on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(nx, ny, 20, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 255, 0.08)`;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Label
        ctx.font = `${isHovered ? '11' : '9'}px "Space Mono", monospace`;
        ctx.fillStyle = isHovered ? '#e8f4f8' : 'rgba(139, 164, 180, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, nx, ny - 12);
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [inView, allSkills, hoveredSkill, staticConnections, isVisible]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;

    let closest: string | null = null;
    let closestDist = 0.04;

    nodesRef.current.forEach((node) => {
      const dx = node.x - mx;
      const dy = node.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < closestDist) {
        closestDist = dist;
        closest = node.name;
      }
    });

    setHoveredSkill(closest);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) clamp(2rem, 8vw, 10%)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <SectionLabel number="03" label="ARSENAL" />

      <TextReveal
        className="section-heading"
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          marginBottom: '1rem',
        }}
      >
        Tech Arsenal
      </TextReveal>

      <p
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}
      >
        FETCH /skills HTTP/1.1 — Interactive constellation • Hover to explore
      </p>

      <div
        className="skills-canvas-wrap"
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          overflow: 'hidden',
          opacity: inView ? 1 : 0,
          transition: 'opacity 1s ease 0.3s',
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredSkill(null)}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: color,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-hex-fallback" style={{ display: 'none' }}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.7rem',
                color: categoryColors[category] || 'var(--neon-cyan)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              {category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {items.map((skill) => (
                <span key={skill} className="tech-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .skills-canvas-wrap {
            display: none !important;
          }
          .skills-hex-fallback {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
