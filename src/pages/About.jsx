import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: FiCode,
      items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Backend',
      icon: FiServer,
      items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Database',
      icon: FiDatabase,
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Tools',
      icon: FiTool,
      items: ['Git', 'Docker', 'AWS', 'Vercel', 'VS Code', 'Figma'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Led development of multiple client projects, mentored junior developers, and implemented best practices for code quality and deployment.'
    },
    {
      year: '2021',
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      description: 'Developed responsive web applications, collaborated with design teams, and optimized application performance.'
    },
    {
      year: '2020',
      title: 'Frontend Developer',
      company: 'Startup Co.',
      description: 'Built user interfaces using React, implemented responsive designs, and worked closely with UX designers.'
    },
    {
      year: '2018',
      title: 'Computer Science Degree',
      company: 'University Name',
      description: 'Bachelor of Science in Computer Science with focus on software engineering and web development.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate full-stack developer with a love for creating innovative solutions 
              and beautiful user experiences. Here's my journey and the tools I work with.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              My Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-600 to-secondary-600"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-dark-900 z-10"></div>
                  
                  {/* Content card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
                    >
                      <div className="flex items-center mb-3">
                        <span className="bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-bold">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                        {item.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                I'm always excited to work on new projects and collaborate with fellow developers. 
                Whether it's a complex web application or a simple landing page, I bring passion and precision to every project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;