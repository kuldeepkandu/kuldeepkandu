'use client';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';

// Particle Sphere
function ParticleSphere() {
  const pointsRef = useRef();
  const count = 2000;

  // Creating particles
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 1.8;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count]);

  // Animation
  useFrame(({ mouse }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.002;
    pointsRef.current.rotation.x = mouse.y * 0.2;
    pointsRef.current.rotation.y = mouse.x * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00eaff"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// AI Core Glow
function AICore() {
  return (
    <mesh>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        emissive={'#00eaff'}
        emissiveIntensity={4}
        color={'#002233'}
      />
    </mesh>
  );
}

export default function AIParticleScene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={2} />

        <AICore />
        <ParticleSphere />

        {/* disable orbit controls for cleaner AI look */}
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    </div>
  );
}
