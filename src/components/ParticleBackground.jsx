import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  // Enhanced particle configuration for better interactivity
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
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ['push', 'bubble'],
        },
        onHover: {
          enable: true,
          mode: ['grab', 'connect'],
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 5,
        },
        bubble: {
          distance: 250,
          size: 12,
          duration: 3,
          opacity: 0.9,
          speed: 3,
        },
        grab: {
          distance: 200,
          links: {
            opacity: 0.9,
            color: '#8b5cf6',
          },
        },
        connect: {
          distance: 150,
          links: {
            opacity: 0.7,
          },
          radius: 100,
        },
      },
    },
    particles: {
      color: {
        value: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
      },
      links: {
        color: '#4f46e5',
        distance: 180,
        enable: true,
        opacity: 0.5,
        width: 1.5,
        triangles: {
          enable: true,
          opacity: 0.1,
        },
      },
      move: {
        directions: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: true,
        speed: { min: 1, max: 3 },
        straight: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        density: {
          enable: true,
          area: 1000,
        },
        value: 100,
      },
      opacity: {
        value: { min: 0.3, max: 0.9 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.2,
          sync: false,
        },
      },
      shape: {
        type: ['circle', 'triangle', 'star'],
        options: {
          star: {
            sides: 5,
          },
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
      life: {
        duration: {
          sync: false,
          value: 3,
        },
        count: 0,
        delay: {
          random: {
            enable: true,
            minimumValue: 0.5,
          },
          value: 1,
        },
      },
    },
    detectRetina: true,
    smooth: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 50,
            },
            links: {
              distance: 120,
            },
            move: {
              speed: { min: 0.5, max: 2 },
            },
          },
          interactivity: {
            modes: {
              grab: {
                distance: 120,
              },
              bubble: {
                distance: 150,
              },
            },
          },
        },
      },
      {
        maxWidth: 480,
        options: {
          particles: {
            number: {
              value: 30,
            },
            links: {
              distance: 100,
            },
            move: {
              speed: { min: 0.3, max: 1.5 },
            },
          },
        },
      },
    ],
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
    />
  );
};

export default ParticleBackground;