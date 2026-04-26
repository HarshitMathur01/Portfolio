'use client';

import { useEffect, useState } from 'react';
import { navItems } from '@/lib/data';

const sectionIds = ['hero', 'about', 'skills', 'projects', 'timeline', 'achievements', 'blog', 'contact'];

const sectionLabels: Record<string, string> = {
  'hero': '00',
  'about': '02',
  'skills': '03',
  'projects': '04',
  'timeline': '05',
  'achievements': '06',
  'blog': '07',
  'contact': '08',
};

export default function StatusBar() {
  const [currentSection, setCurrentSection] = useState('HERO');
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(Math.round((scrollTop / docHeight) * 100));

      // Determine current section
      let current = 'HERO';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = id.toUpperCase();
          }
        }
      }
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) return null;

  const sectionNum = sectionLabels[currentSection.toLowerCase()] || '00';

  return (
    <div className="status-bar">
      SYS {'>'} VIEWING: [{sectionNum} — {currentSection}] | SCROLL: {scrollPercent}%
    </div>
  );
}
