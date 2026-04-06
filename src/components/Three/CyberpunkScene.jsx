'use client';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';

// Neon Particle Sphere
function CyberParticles() {
  const ref = useRef();
  const count = 2600;

  const particles = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos.push(x, y, z);
    }
    return new Float32Array(pos);
  }, []);

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.002;
    ref.current.rotation.x = mouse.y * 0.25;
    ref.current.rotation.y = mouse.x * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a100ff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Cyberpunk Energy Core
function CyberCore() {
  const ref = useRef();

  useFrame(() => {
    ref.current.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.12);
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        emissive={'#ff00cc'}
        emissiveIntensity={4}
        color={'#330020'}
      />
    </mesh>
  );
}

// Glitch Hologram Ring
function HologramRing() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.z += 0.01;
    ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.4;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.03, 32, 100]} />
      <meshStandardMaterial
        color="#00eaff"
        emissive="#00eaff"
        emissiveIntensity={4}
        wireframe
      />
    </mesh>
  );
}

export default function CyberpunkScene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} intensity={1.8} color="#ff00cc" />
        <pointLight position={[-2, -2, -1]} intensity={1.5} color="#00eaff" />

        <CyberCore />
        <CyberParticles />
        <HologramRing />

        {/* Optional: keep disabled for cleaner cinematic look */}
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    </div>
  );
}
