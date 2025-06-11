import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const InteractiveAvatar = ({ mousePosition, isHovered }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    setTime(t);
    
    if (meshRef.current) {
      // Smooth rotation based on mouse position with reduced intensity
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mousePosition.y * 0.1, // Reduced from 0.3
        0.03 // Reduced from 0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mousePosition.x * 0.1, // Reduced from 0.3
        0.03 // Reduced from 0.05
      );
      
      // Floating animation with reduced intensity
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.05; // Reduced
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05; // Reduced from 0.1
    }
  });

  // Memoize orbiting particles to reduce re-renders
  const orbitingParticles = useMemo(() => 
    [...Array(4)].map((_, i) => ( // Reduced from 8 to 4
      <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3}> {/* Reduced speeds */}
        <Sphere
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 1.5, // Reduced orbit radius
            0,
            Math.sin((i / 4) * Math.PI * 2) * 1.5,
          ]}
          args={[0.03, 8, 8]} // Reduced size and segments
        >
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
    )), []
  );

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}> {/* Reduced intensities */}
        <Sphere ref={meshRef} args={[1, 32, 32]} scale={isHovered ? 1.1 : 1}> {/* Reduced segments */}
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.2} // Reduced from 0.4
            speed={1} // Reduced from 2
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      {orbitingParticles}
    </group>
  );
};

const Avatar3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationId;
    
    const handleMouseMove = (event) => {
      // Throttle mouse movement updates
      if (animationId) return;
      
      animationId = requestAnimationFrame(() => {
        setMousePosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        });
        animationId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-96 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}> {/* Limit pixel ratio and add performance settings */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.4} /> {/* Reduced intensity */}
        <pointLight position={[5, 5, 5]} intensity={0.8} /> {/* Reduced intensity and distance */}
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        
        <InteractiveAvatar mousePosition={mousePosition} isHovered={isHovered} />
        
        <Environment preset="night" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5} // Reduced rotation speed
        />
      </Canvas>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default Avatar3D;