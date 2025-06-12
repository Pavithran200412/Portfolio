import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  Environment, 
  PerspectiveCamera,
  Sparkles,
  Icosahedron,
  Torus,
  Box,
  Text,
  MeshWobbleMaterial,
  Stars,
  Cloud,
  Sky,
  ContactShadows,
  Backdrop,
  BakeShadows,
  SoftShadows,
  useTexture,
  Reflector,
  MeshReflectorMaterial
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  DepthOfField,
  Noise,
  Vignette,
  SMAA,
  ToneMapping,
  ColorAverage,
  BrightnessContrast,
  HueSaturation
} from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// Extend Three.js with custom materials
extend({ MeshDistortMaterial, MeshWobbleMaterial });

// Advanced particle system
const AdvancedParticles = ({ count = 200, mousePosition }) => {
  const mesh = useRef();
  const light = useRef();
  const noise = createNoise3D();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40 - 20;
      const z = Math.random() * 40 - 20;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = (particle.time += speed);
      
      // Advanced noise-based movement
      const noiseX = noise(x * 0.01, y * 0.01, t * 0.1) * 2;
      const noiseY = noise(y * 0.01, z * 0.01, t * 0.1) * 2;
      const noiseZ = noise(z * 0.01, x * 0.01, t * 0.1) * 2;
      
      dummy.position.set(
        x + noiseX + Math.cos(t) * factor,
        y + noiseY + Math.sin(t) * factor,
        z + noiseZ + Math.cos(t) * factor
      );
      
      // Mouse interaction
      const mouseInfluence = 0.1;
      dummy.position.x += mousePosition.x * mouseInfluence * (i % 2 === 0 ? 1 : -1);
      dummy.position.y += mousePosition.y * mouseInfluence * (i % 3 === 0 ? 1 : -1);
      
      // Dynamic scaling
      const scale = Math.sin(t * 2) * 0.3 + 0.7;
      dummy.scale.setScalar(scale);
      
      // Color variation
      const hue = (t * 0.1 + i * 0.1) % 1;
      dummy.rotation.set(t, t, t);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    
    // Dynamic lighting
    if (light.current) {
      light.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      light.current.color.setHSL(
        (state.clock.elapsedTime * 0.1) % 1,
        0.7,
        0.6
      );
    }
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
      <pointLight ref={light} position={[0, 0, 0]} intensity={0.5} color="#8b5cf6" />
    </>
  );
};

// Morphing geometry component
const MorphingSphere = ({ mousePosition, isHovered }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const noise = createNoise3D();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Advanced morphing with noise
      const geometry = meshRef.current.geometry;
      const position = geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);
        
        const noiseValue = noise(x * 0.5, y * 0.5, time * 0.3);
        const morphFactor = 1 + noiseValue * 0.3;
        
        position.setXYZ(
          i,
          x * morphFactor,
          y * morphFactor,
          z * morphFactor
        );
      }
      position.needsUpdate = true;
      
      // Rotation with mouse influence
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mousePosition.y * 0.5 + time * 0.1,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mousePosition.x * 0.5 + time * 0.15,
        0.05
      );
      
      // Scale animation
      const scale = isHovered ? 1.2 : 1.0;
      const breathingScale = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.setScalar(scale * breathingScale);
    }
    
    // Material animation
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(time * 3) * 0.2;
      materialRef.current.color.setHSL(
        (time * 0.1) % 1,
        0.8,
        0.6
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#6366f1"
        emissive="#4c1d95"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Holographic rings
const HolographicRings = ({ mousePosition }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.z = mousePosition.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Torus
            args={[2 + i * 0.5, 0.02, 16, 100]}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}
          >
            <meshStandardMaterial
              color={`hsl(${240 + i * 20}, 80%, 60%)`}
              emissive={`hsl(${240 + i * 20}, 80%, 30%)`}
              emissiveIntensity={0.5}
              transparent
              opacity={0.6 - i * 0.1}
            />
          </Torus>
        </Float>
      ))}
    </group>
  );
};

// Energy field effect
const EnergyField = ({ mousePosition }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.1}
        wireframe
        emissive="#4c1d95"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Main avatar component
const InteractiveAvatar = ({ mousePosition, isHovered }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Subtle rotation based on time
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main morphing sphere */}
      <MorphingSphere mousePosition={mousePosition} isHovered={isHovered} />
      
      {/* Holographic rings */}
      <HolographicRings mousePosition={mousePosition} />
      
      {/* Energy field */}
      <EnergyField mousePosition={mousePosition} />
      
      {/* Advanced particle system */}
      <AdvancedParticles mousePosition={mousePosition} />
      
      {/* Sparkles effect */}
      <Sparkles
        count={100}
        scale={[4, 4, 4]}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#8b5cf6"
      />
      
      {/* Additional floating elements */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.8}>
          <Icosahedron
            args={[0.1, 0]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 2.5,
              Math.sin((i / 4) * Math.PI) * 1.5,
              Math.sin((i / 8) * Math.PI * 2) * 2.5,
            ]}
          >
            <meshStandardMaterial
              color={`hsl(${240 + i * 15}, 70%, 60%)`}
              emissive={`hsl(${240 + i * 15}, 70%, 30%)`}
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
};

// Post-processing effects
const Effects = () => {
  return (
    <EffectComposer multisampling={8}>
      <SMAA />
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        height={300}
        opacity={0.8}
      />
      <ChromaticAberration
        offset={[0.0005, 0.0012]}
        radialModulation={true}
        modulationOffset={0.15}
      />
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
      <ToneMapping adaptive={true} resolution={256} middleGrey={0.6} maxLuminance={16.0} averageLuminance={1.0} adaptationRate={1.0} />
      <BrightnessContrast brightness={0.05} contrast={0.1} />
      <HueSaturation hue={0.05} saturation={0.1} />
    </EffectComposer>
  );
};

// Main Avatar3D component
const Avatar3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="w-full h-96 relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.2} color="#4c1d95" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#a855f7"
          castShadow
        />
        
        {/* Environment and atmosphere */}
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        <Environment preset="night" />
        
        {/* Soft shadows */}
        <SoftShadows frustum={3.75} size={0.005} near={9.5} samples={17} rings={11} />
        
        {/* Contact shadows */}
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -2, 0]}
          opacity={0.25}
          width={10}
          height={10}
          blur={1.5}
          far={2}
        />
        
        {/* Main avatar */}
        <InteractiveAvatar mousePosition={mousePosition} isHovered={isHovered} />
        
        {/* Reflective ground */}
        <Reflector
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          args={[10, 10]}
          resolution={512}
          mirror={0.3}
          mixBlur={1}
          mixStrength={0.5}
          depthScale={1}
          minDepthThreshold={0.8}
          maxDepthThreshold={1.2}
          color="#1a1a2e"
        />
        
        {/* Post-processing effects */}
        <Effects />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.3}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Overlay effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-conic from-primary-500/10 via-secondary-500/10 to-accent-500/10 pointer-events-none opacity-50" />
      
      {/* Interactive hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-xs text-gray-400 mb-1">Interactive 3D Avatar</p>
        <p className="text-xs text-gray-500">Move mouse to interact • Drag to rotate</p>
      </motion.div>
    </motion.div>
  );
};

export default Avatar3D;