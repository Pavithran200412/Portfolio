import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { saveAs } from 'file-saver';
import PageTransition from '../components/PageTransition';

const Home = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
  link.href = '/public/Resume.pdf'; // Make sure Resume.pdf is in your public folder
  link.download = 'Pavithran_Resume.pdf';
  link.click();
;
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Pavithran_Resume.pdf');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Pavithran S
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 h-16">
              <TypeAnimation
                sequence={[
                  'Transforming Ideas into Reality',
                  2000,
                  'Tech Enthusiast',
                  2000,
                  'Team Worker',
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
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Passionate about creating beautiful, functional, and user-friendly applications. 
              I love turning complex problems into simple, elegant solutions.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FiDownload className="mr-2" />
              View Resume
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FiMail className="mr-2" />
                Contact Me
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white font-medium rounded-lg transition-all duration-200"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6"
          >
            {[
              { Icon: FiGithub, href: 'https://github.com/Pavithran200412', label: 'GitHub' },
              { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/pavithran-s-1814a3310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
              { Icon: FiMail, href: 'mailto:pavithran.workat@gmail.com', label: 'Email' },
              { Icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
              { Icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Floating Animation Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-10 w-4 h-4 bg-primary-400 rounded-full opacity-60 hidden lg:block"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 right-20 w-6 h-6 bg-secondary-400 rounded-full opacity-40 hidden lg:block"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-accent-400 rounded-full opacity-50 hidden lg:block"
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;