import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiGithub,
  FiMessageSquare,
  FiMail,
  FiChevronDown,
} from 'react-icons/fi'

export interface NavItem {
  label: string
  id: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
}

export interface PillBaseProps {
  items?: NavItem[]
  activeSection?: string
  onSectionClick?: (sectionId: string) => void
}

const defaultIconsMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: FiHome,
  about: FiUser,
  skills: FiCode,
  projects: FiFolder,
  github: FiGithub,
  testimonials: FiMessageSquare,
  contact: FiMail,
}

/**
 * 3D Adaptive Navigation Pill (Fully Responsive to All Media Types)
 * - Desktop/Laptop: Smooth 3D horizontal hover expansion with metallic gloss reflections
 * - Tablets: Dynamically calculated horizontal width, touch & hover adaptive
 * - Mobile (<640px) & Small Phones (<380px): Adaptive 3D pill + floating glass menu with icons,
 *   touch-optimized targets, auto-dismiss on scroll, and zero layout overflow
 */
export const PillBase: React.FC<PillBaseProps> = ({
  items,
  activeSection: externalActiveSection,
  onSectionClick,
}) => {
  const defaultNavItems: NavItem[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'GitHub', id: 'github' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ]

  const navItems = useMemo(
    () => (items && items.length > 0 ? items : defaultNavItems),
    [items]
  )

  const [internalActiveSection, setInternalActiveSection] = useState(navItems[0]?.id || 'home')
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const [hasHoverSupport, setHasHoverSupport] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeSection = externalActiveSection !== undefined ? externalActiveSection : internalActiveSection
  
  // Media breakpoints
  const isMobile = windowWidth < 640
  const isSmallMobile = windowWidth < 380
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  // Collapsed widths tuned per media type
  const collapsedWidth = isSmallMobile ? 96 : isMobile ? 116 : isTablet ? 110 : 124

  // Framer motion spring values for desktop/tablet horizontal pill
  const pillWidth = useSpring(collapsedWidth, { stiffness: 280, damping: 28, mass: 0.9 })
  const pillShift = useSpring(0, { stiffness: 280, damping: 28, mass: 0.9 })

  // Listen to screen resize and hover capability
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      if (width >= 640) {
        setMobileMenuOpen(false)
      }
    }

    if (typeof window !== 'undefined') {
      setHasHoverSupport(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-collapse mobile menu on window scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  // Calculate target horizontal width for tablets & desktops
  const getExpandedWidth = () => {
    // Leave safe room for header margins and logo
    const maxAvailableWidth = Math.min(windowWidth - 140, 720)
    const itemWidth = isTablet ? 64 : 76
    const padding = isTablet ? 20 : 36
    const idealWidth = navItems.length * itemWidth + padding
    return Math.min(maxAvailableWidth, Math.max(300, idealWidth))
  }

  // Handle desktop/tablet horizontal expansion
  useEffect(() => {
    if (isMobile) {
      pillWidth.set(collapsedWidth)
      return
    }

    if (hovering || expanded) {
      const targetWidth = getExpandedWidth()
      pillWidth.set(targetWidth)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        pillWidth.set(collapsedWidth)
      }, 350)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hovering, expanded, pillWidth, windowWidth, navItems.length, collapsedWidth, isMobile, isTablet])

  // Click outside to collapse on all screens
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setHovering(false)
        setExpanded(false)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile && hasHoverSupport) {
      setHovering(true)
      setExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile && hasHoverSupport) {
      setHovering(false)
      setExpanded(false)
    }
  }

  const handleNavClick = () => {
    if (isMobile) {
      setMobileMenuOpen((prev) => !prev)
    } else {
      setExpanded((prev) => !prev)
      setHovering((prev) => !prev)
    }
  }

  const handleSectionSelect = (e: React.MouseEvent, sectionId: string) => {
    e.stopPropagation()
    setInternalActiveSection(sectionId)

    if (onSectionClick) {
      onSectionClick(sectionId)
    }

    setHovering(false)
    setExpanded(false)
    setMobileMenuOpen(false)
  }

  const activeItem = navItems.find((item) => item.id === activeSection) || navItems[0]

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* 3D Adaptive Nav Pill */}
      <motion.nav
        ref={navRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleNavClick}
        className="relative rounded-full backdrop-blur-xl touch-manipulation select-none cursor-pointer"
        style={{
          width: isMobile ? collapsedWidth : pillWidth,
          height: isSmallMobile ? '36px' : isMobile ? '38px' : '42px',
          background: `
            linear-gradient(135deg, 
              rgba(30, 41, 59, 0.90) 0%, 
              rgba(15, 23, 42, 0.95) 45%, 
              rgba(11, 17, 32, 0.98) 100%
            )
          `,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: (expanded && !isMobile) || mobileMenuOpen
            ? `
              0 8px 24px rgba(0, 0, 0, 0.55),
              0 2px 8px rgba(0, 0, 0, 0.4),
              0 0 16px rgba(59, 130, 246, 0.2),
              inset 0 1px 1px rgba(255, 255, 255, 0.25),
              inset 0 -2px 6px rgba(0, 0, 0, 0.5),
              inset 2px 2px 8px rgba(255, 255, 255, 0.08)
            `
            : `
              0 6px 18px rgba(0, 0, 0, 0.4),
              0 2px 4px rgba(0, 0, 0, 0.25),
              0 0 10px rgba(59, 130, 246, 0.08),
              inset 0 1px 1px rgba(255, 255, 255, 0.2),
              inset 0 -2px 6px rgba(0, 0, 0, 0.35)
            `,
          x: isMobile ? 0 : pillShift,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-out',
        }}
      >
        {/* Metallic top highlight */}
        <div
          className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
          style={{
            height: '1.5px',
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.35) 15%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.35) 85%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(0.3px)',
          }}
        />

        {/* Top hemisphere gloss catch */}
        <div
          className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
          style={{
            height: '50%',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        {/* Gloss reflection bubble */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: (expanded && !isMobile) ? '18%' : '14%',
            top: '14%',
            width: (expanded && !isMobile) ? '90px' : '36px',
            height: '8px',
            background:
              'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.12) 40%, rgba(255, 255, 255, 0) 70%)',
            filter: 'blur(2.5px)',
            transform: 'rotate(-12deg)',
            transition: 'all 0.3s ease',
          }}
        />

        {/* Bottom edge shadow */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
          style={{
            height: '50%',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        />

        {/* Pill Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center px-2 sm:px-3">
          {/* Mobile View OR Collapsed Desktop/Tablet: Show current active label + dropdown chevron */}
          {(isMobile || !expanded) && (
            <div className="flex items-center justify-center gap-1.5 w-full px-1">
              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.span
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -5, filter: 'blur(2px)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="truncate text-center"
                    style={{
                      fontSize: isSmallMobile ? '11px' : isMobile ? '12px' : '13px',
                      fontWeight: 650,
                      color: '#ffffff',
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap',
                      textShadow:
                        '0 0 10px rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {activeItem.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Mobile dropdown indicator */}
              {isMobile && (
                <motion.span
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400 shrink-0"
                >
                  <FiChevronDown size={isSmallMobile ? 12 : 14} />
                </motion.span>
              )}
            </div>
          )}

          {/* Desktop/Tablet Expanded Horizontal Row */}
          {!isMobile && expanded && (
            <div className="flex items-center justify-between w-full gap-0.5 sm:gap-1">
              {navItems.map((item, index) => {
                const isActive = item.id === activeSection
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.18,
                      ease: 'easeOut',
                    }}
                    onClick={(e) => handleSectionSelect(e, item.id)}
                    className="relative cursor-pointer transition-all duration-200 flex-1 text-center shrink-0"
                    style={{
                      fontSize: isTablet ? (isActive ? '12px' : '11.5px') : isActive ? '13px' : '12.5px',
                      fontWeight: isActive ? 650 : 500,
                      color: isActive ? '#ffffff' : '#94a3b8',
                      letterSpacing: '0.25px',
                      background: 'transparent',
                      border: 'none',
                      padding: isTablet ? '4px 6px' : '6px 10px',
                      outline: 'none',
                      whiteSpace: 'nowrap',
                      textShadow: isActive
                        ? '0 0 8px rgba(59, 130, 246, 0.5), 0 1px 2px rgba(0, 0, 0, 0.8)'
                        : '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#f1f5f9'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#94a3b8'
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

      {/* Mobile Floating 3D Glass Menu Dropdown */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            {/* Backdrop Dismiss Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] pointer-events-auto"
            />

            {/* Floating Glass Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full mt-2.5 z-50 pointer-events-auto w-[280px] sm:w-[320px] max-w-[calc(100vw-32px)] rounded-2xl p-2"
              style={{
                background: `
                  linear-gradient(145deg, 
                    rgba(30, 41, 59, 0.96) 0%, 
                    rgba(15, 23, 42, 0.98) 60%, 
                    rgba(11, 17, 32, 0.99) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `
                  0 16px 36px rgba(0, 0, 0, 0.6),
                  0 4px 12px rgba(0, 0, 0, 0.4),
                  0 0 20px rgba(59, 130, 246, 0.15),
                  inset 0 1px 1px rgba(255, 255, 255, 0.2)
                `,
              }}
            >
              {/* Metallic top line inside dropdown */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                }}
              />

              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = item.id === activeSection
                  const Icon = item.icon || defaultIconsMap[item.id] || FiCode

                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleSectionSelect(e, item.id)}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left ${
                        isActive
                          ? 'bg-primary-500/20 text-white border border-primary-500/30 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                              : 'bg-slate-800/80 text-slate-400'
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <span className="text-sm font-medium tracking-wide">
                          {item.label}
                        </span>
                      </div>

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_8px_#38bdf8]" />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
