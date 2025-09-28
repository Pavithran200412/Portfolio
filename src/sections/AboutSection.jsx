import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiTarget, FiAward, FiCodesandbox } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const AboutSection = () => {
  const timeline = [
     {
      year: 'Jun - Sep 2025',
      title: 'Web Frontend Developer’s Team',
      company: 'Solvexa (Startup)',
      description: 'Learned how large-scale industries design and structure frontend systems with professional standards and practices.',
      icon: FiCodesandbox,
      color: 'primary'
    },
    {
      year: '2023 – Present',
      title: 'Madras Institute of Technology, Anna University Chennai, Tamil Nadu.',
      company: 'Bachelor of Engineering in Computer Science',
      description: 'Currently pursuing my Bachelor of Engineering in Computer Science, focusing on software development, algorithms, and data structures.',
      icon: FiUser,
      color: 'primary'
    },
    {
      year: 'Jun 2020 – Apr 2023',
      title: 'Adhiparasakthi Polytechnic College Chengalpattu, Tamil Nadu.',
      company: 'Diploma in Computer Science',
      description: 'Completed my diploma in Computer Science, gaining foundational knowledge in programming and software development.',
      icon: FiAward,
      color: 'secondary'
    },
    {
      year: '2008 – 2020',
      title: 'St.Joseph of Cluny Matric Hr.Sec. School Viluppuram, Tamil Nadu.',
      company: 'Schooling',
      description: 'Completed my schooling at St.Joseph of Cluny Matric Hr.Sec. School Viluppuram, Tamil Nadu.',
      icon: FiHeart,
      color: 'accent'
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm a passionate developer developing my skills and learning new things. I have a love for creating innovative solutions 
            and beautiful user experiences. Here's my journey and what drives me every day.
          </motion.p>
        </AnimatedSection>

        {/* Personal Story */}
        <AnimatedSection animation="fadeInUp" delay={0.3} className="mb-20">
          <GlowingCard className="p-8 md:p-12 text-center bg-gray-50 dark:bg-gray-800">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FiUser className="text-6xl text-primary-400 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Story</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Started as a curious kid who loved taking apart computers, I've evolved into a developer 
                who builds digital experiences that matter. My journey spans from learning my first 
                "Hello World" to architecting complex applications that serve thousands of users. 
                I believe in the power of clean code, beautiful design, and meaningful user interactions.
              </p>
            </motion.div>
          </GlowingCard>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">My Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-1 bg-gradient-to-b from-primary-600 via-secondary-600 to-accent-600"></div>
            
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full border-4 border-white dark:border-gray-900 z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="text-white" size={16} />
                  </motion.div>
                  
                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <GlowingCard glowColor={item.color}>
                      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center mb-3">
                          <span className={`bg-${item.color}-100 dark:bg-${item.color}-900/50 text-${item.color}-600 dark:text-${item.color}-400 px-3 py-1 rounded-full text-sm font-bold`}>
                            {item.year}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                          {item.company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </GlowingCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection animation="scaleIn" delay={0.8} className="mt-20 text-center">
          <GlowingCard className="p-8 text-center bg-white dark:bg-gray-800">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                I'm always excited to work on new projects and collaborate with fellow developers. 
                Whether it's a complex web application or a simple landing page, I bring passion and precision to every project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </GlowingCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;