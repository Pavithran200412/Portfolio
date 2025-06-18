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
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ['push', 'repulse'],
        },
        onHover: {
          enable: true,
          mode: ['grab', 'bubble'],
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        grab: {
          distance: 150,
          links: {
            opacity: 0.8,
          },
        },
        bubble: {
          distance: 200,
          size: 8,
          duration: 2,
          opacity: 0.8,
        },
      },
    },
    particles: {
      color: {
        value: isDark ? ['#6366f1', '#8b5cf6', '#06b6d4'] : ['#3b82f6', '#6366f1', '#8b5cf6'],
      },
      links: {
        color: isDark ? '#4f46e5' : '#6366f1',
        distance: 150,
        enable: true,
        opacity: isDark ? 0.4 : 0.3,
        width: 1,
      },
      move: {
        directions: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: true,
        speed: { min: 0.5, max: 2 },
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: ['circle', 'triangle'],
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
        },
      },
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 40,
            },
            links: {
              distance: 100,
            },
            move: {
              speed: { min: 0.3, max: 1 },
            },
          },
          interactivity: {
            modes: {
              grab: {
                distance: 100,
              },
              bubble: {
                distance: 100,
              },
            },
          },
        },
      },
    ],
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