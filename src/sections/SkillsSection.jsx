import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const SkillsSection = () => {
  const skills = [
    {
      category: 'Programming Languages & Frontend',
      icon: FiCode,
      items: [
        { name: 'Java', level: 85 },
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Bootstrap', level: 80 }
      ],
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'primary'
    },
    {
      category: 'Backend',
      icon: FiServer,
      items: [
        { name: 'Node.js', level: 88 },
        { name: 'Express', level: 85 },
      ],
      color: 'from-green-500 to-emerald-500',
      glowColor: 'secondary'
    },
    {
      category: 'Database',
      icon: FiDatabase,
      items: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MySQL', level: 85 },
        { name: 'SQL', level: 85 }
      ],
      color: 'from-purple-500 to-pink-500',
      glowColor: 'accent'
    },
    {
      category: 'Tools & Others',
      icon: FiTool,
      items: [
        { name: 'Git', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 80 }
      ],
      color: 'from-orange-500 to-red-500',
      glowColor: 'success'
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Technologies</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Here are the technologies and tools I work with to bring ideas to life.
          </motion.p>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <AnimatedSection
                key={skill.category}
                animation="fadeInUp"
                delay={index * 0.1}
              >
                <GlowingCard glowColor={skill.glowColor} className="h-full">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl h-full">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-6 mx-auto`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      {skill.category}
                    </h3>
                    <div className="space-y-4">
                      {skill.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                            <span className="text-primary-600 dark:text-primary-400 text-sm">{item.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.level}%` }}
                              transition={{ duration: 1, delay: itemIndex * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlowingCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Interactive Skills Visualization */}
        <AnimatedSection animation="scaleIn" delay={0.8} className="mt-20">
          <GlowingCard className="p-8 text-center bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Development</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I specialize in creating interactive, engaging user experiences with modern web technologies, 
              3D graphics, and smooth animations that captivate users.
            </p>
            <div className="flex justify-center space-x-8">
              {[
                { label: 'Projects Completed', value: '5+' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </GlowingCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SkillsSection;