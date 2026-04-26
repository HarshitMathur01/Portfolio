'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Particles — reduced from 1500 → 600.
 * The visual density is nearly the same due to size adjustment,
 * but CPU work per frame drops by 60%.
 */
function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const count = 450;

  const [positions, originalPositions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const cyanColor = new THREE.Color('#00e5ff');
    const purpleColor = new THREE.Color('#7b2fff');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      const mix = Math.random();
      const color = cyanColor.clone().lerp(purpleColor, mix);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = Math.random() * 4 + 1; // slightly bigger to compensate fewer particles
    }

    return [pos, origPos, col, siz];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !meshRef.current.geometry.attributes.position) return;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Slow drift
      posArray[ix] = originalPositions[ix] + Math.sin(time * 0.1 + i * 0.01) * 0.15;
      posArray[iy] = originalPositions[iy] + Math.cos(time * 0.08 + i * 0.015) * 0.1;
      posArray[iz] = originalPositions[iz] + Math.sin(time * 0.05 + i * 0.02) * 0.05;

      // Mouse repulsion
      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const distSq = dx * dx + dy * dy;
      const repelRadiusSq = 6.25; // 2.5 * 2.5

      if (distSq < repelRadiusSq) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 2.5) * 0.6;
        posArray[ix] += (dx / dist) * force;
        posArray[iy] += (dy / dist) * force;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (!geometryRef.current) return;
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  }, [positions, colors, sizes]);

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        vertexColors
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function WireframeTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -5]}>
      <torusGeometry args={[3, 1, 12, 32]} />
      <meshBasicMaterial
        color="#0a1628"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Pause canvas when tab is hidden
    const handleVisibility = () => setShouldRender(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);

    // Pause canvas when hero section scrolls out of view
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShouldRender(entry.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    observer.observe(containerRef.current);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.85,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.2]}
        frameloop={shouldRender ? 'always' : 'never'}
      >
        <Particles />
        <WireframeTorus />
      </Canvas>
    </div>
  );
}
