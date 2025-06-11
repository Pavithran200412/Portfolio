import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { saveAs } from 'file-saver';
import Avatar3D from '../components/Avatar3D';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection = () => {
  const handleDownloadResume = () => {
    const resumeContent = `Pavithran S 
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
              <motion.span 
                className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Pavithran S
              </motion.span>
            </motion.h1>
            
            <div className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 h-20">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'React Specialist',
                  2000,
                  'UI/UX Enthusiast',
                  2000,
                  '3D Graphics Creator',
                  2000,
                  'Problem Solver',
                  2000,
                ]}
                wrapper="span"
                speed={50}
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
              I love turning complex problems into simple, elegant solutions with cutting-edge technology.
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
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300"
            >
              <FiDownload className="mr-2" />
              View Resume
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300"
            >
              <FiMail className="mr-2" />
              Contact Me
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm"
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
              { Icon: FiMail, href: 'mailto:john.doe@example.com', label: 'Email', color: 'hover:text-green-400' },
            ].map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, y: -5, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 text-gray-400 ${color} transition-all duration-300 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20`}
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
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
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