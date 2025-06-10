import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
  const { isDark } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  const particlesConfig = {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    background: {
      color: {
        value: isDark ? '#0f172a' : '#f8fafc',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ['push', 'bubble'],
        },
        onHover: {
          enable: true,
          mode: ['repulse', 'connect'],
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 6,
        },
        repulse: {
          distance: 300,
          duration: 0.4,
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8,
        },
        connect: {
          distance: 200,
          links: {
            opacity: 0.3,
          },
        },
      },
    },
    particles: {
      color: {
        value: ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981'],
      },
      links: {
        color: isDark ? '#4f46e5' : '#a5b4fc',
        distance: 150,
        enable: true,
        opacity: isDark ? 0.4 : 0.3,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.1,
        },
      },
      collisions: {
        enable: true,
        bounce: {
          horizontal: {
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            value: 1,
          },
          vertical: {
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            value: 1,
          },
        },
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
        trail: {
          enable: true,
          length: 10,
          fillColor: isDark ? '#0f172a' : '#f8fafc',
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 120,
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
        type: ['circle', 'triangle', 'polygon'],
        options: {
          polygon: {
            sides: 6,
          },
        },
      },
      size: {
        value: { min: 1, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
    />
  );
};

export default ParticleBackground;