import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import ResumePreview from '../components/ResumePreview';
import ViewCounter from '../components/ViewCounter';

const HeroSection = () => {
  const [showResume, setShowResume] = useState(false);

  const scrollToNext = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 bg-primary-500 rounded-full opacity-30 group-hover:opacity-50 blur-md transition-opacity duration-500" />
              
              {/* Border */}
              <div className="relative p-1 bg-primary-500 rounded-full">
                <div className="bg-gray-900 rounded-full p-1">
                  <img
                    src="/profile.jpg"
                    alt="Pavithran S - Software Developer"
                    className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className="absolute bottom-4 right-4 bg-green-500 border-4 border-gray-900 rounded-full w-6 h-6 md:w-7 md:h-7"
                title="Available for opportunities"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.p
                className="text-sm md:text-base font-medium text-primary-400 tracking-widest uppercase mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Welcome to my portfolio
              </motion.p>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Hi, I'm{' '}
                <span className="text-primary-400">Pavithran S</span>
              </motion.h1>
              
              <div className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-6 h-14 md:h-16">
                <TypeAnimation
                  sequence={[
                    'Transforming Ideas into Reality',
                    3000,
                    'Tech Enthusiast',
                    3000,
                    'Team Worker',
                    3000,
                    'Problem Solver',
                    3000,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                  className="font-medium"
                />
              </div>
              
              <motion.p 
                className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Passionate about creating beautiful, functional, and user-friendly applications. 
                I love turning complex problems into simple, elegant solutions.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowResume(true)}
                className="inline-flex items-center px-6 py-3 md:px-7 md:py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl shadow-md shadow-primary-500/20 transition-all duration-200"
              >
                <FiDownload className="mr-2" />
                View Resume
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 md:px-7 md:py-3.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] hover:border-white/[0.24] text-[#f5f5f7] font-medium rounded-xl transition-all duration-200"
              >
                <FiMail className="mr-2" />
                Contact Me
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 md:px-7 md:py-3.5 text-secondary-500 hover:text-white font-medium transition-all duration-200"
              >
                View Projects →
              </motion.button>
            </motion.div>

            {/* Social Links + View Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <div className="flex justify-center lg:justify-start space-x-3">
                {[
                  { Icon: FiGithub, href: 'https://github.com/Pavithran200412', label: 'GitHub' },
                  { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/pavithran-s3012/', label: 'LinkedIn' },
                  { Icon: FiMail, href: 'mailto:pavithran.workat@gmail.com', label: 'Email' }
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -1.5 }}
                    whileTap={{ scale: 0.96 }}
                    className="p-3 text-secondary-500 hover:text-white transition-all duration-200 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.18]"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
              <ViewCounter />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-12 lg:mt-16"
        >
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gray-500 hover:text-primary-400 transition-colors duration-200"
            aria-label="Scroll to about section"
          >
            <FiArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>

      {/* Resume Preview Modal */}
      <ResumePreview isOpen={showResume} onClose={() => setShowResume(false)} />
    </section>
  );
};

export default HeroSection;