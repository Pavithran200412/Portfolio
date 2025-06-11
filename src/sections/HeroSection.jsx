import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { saveAs } from 'file-saver';
import Avatar3D from '../components/Avatar3D';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection = () => {
  const handleDownloadResume = () => {
    const resumeContent = `Pavithran S 
Full Stack Developer
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Pavithran_Resume.txt');
  };

  const scrollToNext = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Pavithran S
              </span>
            </motion.h1>
            
            <div className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 h-20">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  3000, // Increased delay
                  'React Specialist',
                  3000,
                  'UI/UX Enthusiast',
                  3000,
                  'Problem Solver',
                  3000,
                ]}
                wrapper="span"
                speed={40} // Reduced speed
                repeat={Infinity}
                className="font-medium"
              />
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Passionate about creating beautiful, functional, and user-friendly applications. 
              I love turning complex problems into simple, elegant solutions.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} // Reduced scale and movement
              whileTap={{ scale: 0.97 }}
              onClick={handleDownloadResume}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200"
            >
              <FiDownload className="mr-2" />
              View Resume
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} // Reduced scale and movement
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200"
            >
              <FiMail className="mr-2" />
              Contact Me
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} // Reduced scale and movement
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center lg:justify-start space-x-6"
          >
            {[
              { Icon: FiGithub, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-400' },
              { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400' },
              { Icon: FiMail, href: 'mailto:pavithran@example.com', label: 'Email', color: 'hover:text-green-400' },
            ].map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }} // Reduced movement
                whileTap={{ scale: 0.95 }}
                className={`p-4 text-gray-400 ${color} transition-all duration-200 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20`}
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Column - 3D Avatar */}
        <AnimatedSection animation="scaleIn" delay={1.2} className="flex justify-center">
          <Avatar3D />
        </AnimatedSection>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 5, 0] }} // Reduced movement
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} // Increased duration
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
          <span className="text-sm mb-2">Scroll Down</span>
          <FiArrowDown size={24} />
        </div>
      </motion.button>
    </section>
  );
};

export default HeroSection;