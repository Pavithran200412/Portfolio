import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
  const { isDark } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  // Memoize particle configuration to prevent unnecessary re-renders
  const particlesConfig = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    background: {
      color: {
        value: isDark ? '#0f172a' : '#f8fafc',
      },
    },
    fpsLimit: 60, // Reduced from 120 to 60 for better performance
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 2, // Reduced from 6
        },
        repulse: {
          distance: 150, // Reduced from 300
          duration: 0.2, // Reduced from 0.4
        },
      },
    },
    particles: {
      color: {
        value: ['#6366f1', '#8b5cf6'],
      },
      links: {
        color: isDark ? '#4f46e5' : '#a5b4fc',
        distance: 120, // Reduced from 150
        enable: true,
        opacity: isDark ? 0.3 : 0.2, // Reduced opacity
        width: 1,
      },
      move: {
        directions: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false, // Disabled random movement
        speed: { min: 0.3, max: 1 }, // Reduced speed
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1200, // Increased area to reduce particle density
        },
        value: 60, // Reduced from 120
      },
      opacity: {
        value: { min: 0.2, max: 0.6 }, // Reduced opacity
        animation: {
          enable: true,
          speed: 0.5, // Reduced animation speed
          minimumValue: 0.1,
        },
      },
      shape: {
        type: 'circle', // Only use circles for better performance
      },
      size: {
        value: { min: 1, max: 4 }, // Reduced max size
        animation: {
          enable: true,
          speed: 1, // Reduced animation speed
          minimumValue: 0.5,
        },
      },
    },
    detectRetina: true,
  }), [isDark]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
    />
  );
};

export default ParticleBackground;