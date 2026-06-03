import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiAward, FiCodesandbox } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';

const AboutSection = () => {
  const timeline = [
    {
      year: 'Sep 2023 – May 2026',
      title: 'Madras Institute of Technology, Anna University Chennai, Tamil Nadu.',
      company: 'Bachelor of Engineering in Computer Science',
      description: 'Currently pursuing my Bachelor of Engineering in Computer Science, focusing on software development, algorithms, and data structures.',
      icon: FiUser,
    },
    {
      year: 'Jul 2025 - Sep 2025',
      title: 'Web Frontend Developer\'s Team',
      company: 'Vought Innovations - Solvexa (Startup)',
      description: 'Learned how large-scale industries design and structure frontend systems with professional standards and practices.',
      icon: FiCodesandbox,
    },
    {
      year: 'Jun 2020 – Apr 2023',
      title: 'Adhiparasakthi Polytechnic College Chengalpattu, Tamil Nadu.',
      company: 'Diploma in Computer Science',
      description: 'Completed my diploma in Computer Science, gaining foundational knowledge in programming and software development.',
      icon: FiAward,
    },
    {
      year: '2008 – 2020',
      title: 'St.Joseph of Cluny Matric Hr.Sec. School Viluppuram, Tamil Nadu.',
      company: 'Schooling',
      description: 'Completed my schooling at St.Joseph of Cluny Matric Hr.Sec. School Viluppuram, Tamil Nadu.',
      icon: FiHeart,
    }
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About <span className="text-primary-400">Me</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm a passionate developer developing my skills and learning new things. Here's my journey so far.
          </motion.p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-px bg-gray-800" />
          
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full border-4 border-gray-900 z-10 flex items-center justify-center">
                  <Icon className="text-white" size={14} />
                </div>
                
                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-6 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-primary-500/20 transition-all duration-300"
                  >
                    <span className="inline-block px-3 py-1 bg-primary-600/10 text-primary-400 rounded-full text-sm font-semibold mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-primary-400 font-medium text-sm mb-3">
                      {item.company}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;