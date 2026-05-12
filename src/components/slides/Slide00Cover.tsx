import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { projectMeta } from '@/data/eda';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 6 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={'#17191c'}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const count = 60;
  const positions = new Float32Array(count * 6);
  for (let i = 0; i < count; i++) {
    const a = new THREE.Vector3(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    );
    const b = a.clone().add(
      new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5
      )
    );
    positions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
  }
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = -state.clock.getElapsedTime() * 0.03;
  });
  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial color={'#5d2a1a'} transparent opacity={0.25} />
    </lineSegments>
  );
}

export default function Slide00Cover() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-canvas">
      {/* Three.js bg */}
      <div className="absolute inset-0 grain">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <ParticleField />
          <ConnectingLines />
        </Canvas>
      </div>

      {/* Warm-mist gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 15% 100%, rgba(251, 225, 209, 0.45) 0%, transparent 55%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-center px-[clamp(40px,8vw,160px)] py-[clamp(60px,10vw,120px)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="eyebrow">
            Sustentación · Proyecto de Grado I · UNAB 2026
          </span>

          <h1 className="mt-8 text-[clamp(40px,6.4vw,84px)] leading-[1.04] tracking-tight font-display text-ink">
            Algoritmo de aprendizaje{' '}
            <span className="italic text-terracotta">autosupervisado</span>
            <br />
            para la detección de{' '}
            <span className="italic">lesiones cutáneas</span>
            <br />
            en el contexto clínico de{' '}
            <span className="italic">Santander</span>.
          </h1>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-sm">
            <div>
              <span className="eyebrow">Autores</span>
              <p className="mt-1.5 text-ink font-medium">
                {projectMeta.authors[0]}
              </p>
              <p className="text-ink/80">{projectMeta.authors[1]}</p>
            </div>
            <div>
              <span className="eyebrow">Director</span>
              <p className="mt-1.5 text-ink font-medium">{projectMeta.director}</p>
              <span className="eyebrow mt-3 block">Asesora</span>
              <p className="mt-1.5 text-ink font-medium">{projectMeta.advisor}</p>
              <p className="text-muted-stone text-xs">{projectMeta.advisorAffiliation}</p>
            </div>
          </div>

          <div className="mt-12 text-xs text-light-steel font-mono">
            {projectMeta.university} · {projectMeta.course}
          </div>
        </motion.div>
      </div>

      {/* Down-hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-light-steel font-mono no-print"
      >
        <span className="block animate-pulse">↓ usa las flechas para avanzar</span>
      </motion.div>
    </div>
  );
}
