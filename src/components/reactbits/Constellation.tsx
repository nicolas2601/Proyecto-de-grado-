import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ParticleField({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.7) * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.4 - 2;
      sizes[i] = Math.random() * 1.6 + 0.4;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, phases };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
      uColorA: { value: new THREE.Color('#41a1cf') },
      uColorB: { value: new THREE.Color('#ffffff') },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      const px = state.pointer.x * 0.15;
      const py = state.pointer.y * 0.15;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        py,
        0.04
      );
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        px * viewport.width * 0.02,
        0.06
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          uniform float uTime;
          uniform float uPixelRatio;
          attribute float aSize;
          attribute float aPhase;
          varying float vTwinkle;
          void main() {
            vec3 p = position;
            float t = uTime * 0.6 + aPhase;
            vTwinkle = 0.55 + 0.45 * sin(t * 1.4);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * uPixelRatio * (260.0 / -mv.z);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vTwinkle;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float alpha = smoothstep(0.5, 0.0, d);
            float core = smoothstep(0.22, 0.0, d);
            vec3 col = mix(uColorA, uColorB, core);
            gl_FragColor = vec4(col, alpha * vTwinkle * 0.85);
          }
        `}
      />
    </points>
  );
}

export default function Constellation({
  density = 900,
  className = '',
}: {
  density?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ParticleField count={density} />
      </Canvas>
    </div>
  );
}
