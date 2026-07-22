import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

export interface NavItem {
  label: string
  id: string
}

export interface PillBaseProps {
  items?: NavItem[]
  activeSection?: string
  onSectionClick?: (sectionId: string) => void
}

/**
 * 3D Adaptive Navigation Pill (Fully Responsive & Mobile-Optimized)
 * Smart navigation with scroll detection, hover expansion, touch tap support, and auto-screen scaling
 */
export const PillBase: React.FC<PillBaseProps> = ({
  items,
  activeSection: externalActiveSection,
  onSectionClick,
}) => {
  const defaultNavItems: NavItem[] = [
    { label: 'Home', id: 'home' },
    { label: 'Problem', id: 'problem' },
    { label: 'Solution', id: 'solution' },
    { label: 'Contact', id: 'contact' },
  ]

  const navItems = items && items.length > 0 ? items : defaultNavItems

  const [internalActiveSection, setInternalActiveSection] = useState(navItems[0]?.id || 'home')
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024)

  const navRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevSectionRef = useRef(navItems[0]?.id || 'home')

  const activeSection = externalActiveSection !== undefined ? externalActiveSection : internalActiveSection
  const isMobile = windowWidth < 640
  const isSmallMobile = windowWidth < 380

  const collapsedWidth = isMobile ? (isSmallMobile ? 85 : 95) : 110

  // Spring animations for smooth motion
  const pillWidth = useSpring(collapsedWidth, { stiffness: 260, damping: 26, mass: 1 })
  const pillShift = useSpring(0, { stiffness: 260, damping: 26, mass: 1 })

  // Track screen size for responsive width calculations
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate target expanded width responsive to viewport
  const getExpandedWidth = () => {
    const maxAvailableWidth = windowWidth - 32 // 16px padding on left and right
    const itemWidth = isSmallMobile ? 48 : isMobile ? 58 : 75
    const idealWidth = navItems.length * itemWidth + (isMobile ? 24 : 40)
    return Math.min(maxAvailableWidth, Math.max(260, idealWidth))
  }

  // Handle hover and state expansion
  useEffect(() => {
    if (hovering || expanded) {
      const targetWidth = getExpandedWidth()
      pillWidth.set(targetWidth)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        pillWidth.set(collapsedWidth)
      }, 400)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hovering, expanded, pillWidth, windowWidth, navItems.length, collapsedWidth])

  // Handle click/tap outside to collapse on touch devices
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setHovering(false)
        setExpanded(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) {
      setHovering(true)
      setExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHovering(false)
      setExpanded(false)
    }
  }

  const handleNavTap = () => {
    if (!expanded) {
      setExpanded(true)
      setHovering(true)
    }
  }

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.stopPropagation()
    setIsTransitioning(true)
    prevSectionRef.current = sectionId
    setInternalActiveSection(sectionId)

    if (onSectionClick) {
      onSectionClick(sectionId)
    }
    
    setHovering(false)
    setExpanded(false)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }

  const activeItem = navItems.find(item => item.id === activeSection) || navItems[0]

  return (
    <motion.nav
      ref={navRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleNavTap}
      className="relative rounded-full backdrop-blur-xl touch-manipulation select-none cursor-pointer"
      style={{
        width: pillWidth,
        height: isMobile ? '38px' : '42px',
        background: `
          linear-gradient(135deg, 
            rgba(30, 41, 59, 0.88) 0%, 
            rgba(15, 23, 42, 0.94) 45%, 
            rgba(11, 17, 32, 0.98) 100%
          )
        `,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: expanded
          ? `
            0 8px 24px rgba(0, 0, 0, 0.5),
            0 2px 8px rgba(0, 0, 0, 0.4),
            0 0 16px rgba(59, 130, 246, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.25),
            inset 0 -2px 6px rgba(0, 0, 0, 0.5),
            inset 2px 2px 8px rgba(255, 255, 255, 0.08)
          `
          : isTransitioning
          ? `
            0 6px 18px rgba(0, 0, 0, 0.45),
            0 2px 5px rgba(0, 0, 0, 0.3),
            0 0 12px rgba(59, 130, 246, 0.12),
            inset 0 1px 1px rgba(255, 255, 255, 0.2),
            inset 0 -2px 6px rgba(0, 0, 0, 0.4)
          `
          : `
            0 6px 18px rgba(0, 0, 0, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.25),
            0 0 10px rgba(59, 130, 246, 0.08),
            inset 0 1px 1px rgba(255, 255, 255, 0.2),
            inset 0 -2px 6px rgba(0, 0, 0, 0.35)
          `,
        x: pillShift,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease-out',
      }}
    >
      {/* Primary top edge ridge - bright metallic highlight */}
      <div 
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
        style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.35) 15%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.35) 85%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(0.3px)',
        }}
      />
      
      {/* Top hemisphere light catch */}
      <div 
        className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.06) 40%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
      
      {/* Directional light - top left */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0) 60%)',
        }}
      />
      
      {/* Premium gloss reflection - main */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          left: expanded ? '18%' : '15%',
          top: '14%',
          width: expanded ? (isMobile ? '70px' : '100px') : '40px',
          height: '8px',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.12) 40%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(3px)',
          transform: 'rotate(-12deg)',
          transition: 'all 0.3s ease',
        }}
      />
      
      {/* Secondary gloss accent - only show when expanded */}
      {expanded && !isMobile && (
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            right: '22%',
            top: '18%',
            width: '60px',
            height: '8px',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 60%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(2px)',
            transform: 'rotate(8deg)',
          }}
        />
      )}

      {/* Bottom curvature shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 25%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Micro edge definition */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      />

      {/* Navigation items container */}
      <div 
        className="relative z-10 h-full flex items-center justify-center px-2 sm:px-4"
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro", Poppins, sans-serif',
        }}
      >
        {/* Collapsed state - show active item */}
        {!expanded && (
          <div className="flex items-center justify-center w-full relative">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="truncate text-center"
                  style={{
                    fontSize: isMobile ? '12px' : '13.5px',
                    fontWeight: 650,
                    color: '#ffffff',
                    letterSpacing: '0.35px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textShadow: `
                      0 0 10px rgba(255, 255, 255, 0.4),
                      0 1px 2px rgba(0, 0, 0, 0.8)
                    `,
                  }}
                >
                  {activeItem.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Expanded state - show all items in responsive row */}
        {expanded && (
          <div className="flex items-center justify-between w-full overflow-x-auto no-scrollbar gap-0.5 sm:gap-1">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ 
                    delay: index * 0.04,
                    duration: 0.2,
                    ease: 'easeOut'
                  }}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  className="relative cursor-pointer transition-all duration-200 flex-1 text-center shrink-0"
                  style={{
                    fontSize: isSmallMobile ? '10.5px' : isMobile ? '11.5px' : isActive ? '13.5px' : '13px',
                    fontWeight: isActive ? 650 : 500,
                    color: isActive ? '#ffffff' : '#94a3b8',
                    textDecoration: 'none',
                    letterSpacing: isMobile ? '0.2px' : '0.35px',
                    background: 'transparent',
                    border: 'none',
                    padding: isMobile ? '4px 6px' : '6px 12px',
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                    textShadow: isActive 
                      ? `
                        0 0 8px rgba(59, 130, 246, 0.5),
                        0 1px 2px rgba(0, 0, 0, 0.8)
                      `
                      : `
                        0 1px 2px rgba(0, 0, 0, 0.5)
                      `,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && !isMobile) {
                      e.currentTarget.style.color = '#f1f5f9'
                      e.currentTarget.style.transform = 'translateY(-0.5px)'
                      e.currentTarget.style.textShadow = `
                        0 0 6px rgba(255, 255, 255, 0.3),
                        0 1px 2px rgba(0, 0, 0, 0.6)
                      `
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && !isMobile) {
                      e.currentTarget.style.color = '#94a3b8'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.textShadow = `
                        0 1px 0 rgba(0, 0, 0, 0.22)
                      `
                    }
                  }}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.nav>
  )
}
