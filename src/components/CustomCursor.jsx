import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Don't show custom cursor on mobile
    if (isMobile) {
      document.body.style.cursor = 'auto';
      return;
    }

    let animationId;
    
    const updateMousePosition = (e) => {
      if (animationId) return;
      
      animationId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        animationId = null;
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, [role="button"], .cursor-pointer, .group'
      );

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const elementType = element.tagName.toLowerCase();
          
          if (elementType === 'input' || elementType === 'textarea') {
            setCursorVariant('text');
          } else if (elementType === 'a') {
            setCursorVariant('link');
          } else {
            setCursorVariant('hover');
          }
        });
        
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add hover listeners after a short delay
    setTimeout(addHoverListeners, 100);

    // Re-add listeners when new elements are added
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      border: '2px solid rgba(99, 102, 241, 0.4)',
      mixBlendMode: 'difference',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.9)',
      border: '2px solid rgba(139, 92, 246, 0.6)',
      mixBlendMode: 'difference',
    },
    text: {
      scale: 0.8,
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      border: '2px solid rgba(34, 197, 94, 0.4)',
      mixBlendMode: 'difference',
    },
    link: {
      scale: 1.2,
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      border: '2px solid rgba(249, 115, 22, 0.4)',
      mixBlendMode: 'difference',
    },
    clicking: {
      scale: 0.8,
      backgroundColor: 'rgba(239, 68, 68, 0.9)',
      border: '2px solid rgba(239, 68, 68, 0.6)',
      mixBlendMode: 'difference',
    }
  };

  const currentVariant = isClicking ? 'clicking' : cursorVariant;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={cursorVariants[currentVariant]}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998]"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          backgroundColor: 'rgba(99, 102, 241, 0.3)',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-primary-400/20 pointer-events-none z-[9997]"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        animate={{
          scale: isHovering ? 0.8 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
      />
    </>
  );
};

export default CustomCursor;