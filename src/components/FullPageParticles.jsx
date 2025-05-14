import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FullPageParticles() {
  const particlesRef = useRef();

  const particles = new Float32Array(1000 * 3).map(() => (Math.random() - 0.5) * 10);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.02;
        if (positions[i + 1] < -5) {
          positions[i + 1] = 5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="white" />
    </points>
  );
}