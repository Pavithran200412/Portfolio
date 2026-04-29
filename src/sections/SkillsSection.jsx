import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const SkillsSection = () => {
  const skills = [
    {
      category: 'Programming Languages & Frontend',
      items: [
        { name: 'Java', icon: 'devicon-java-plain colored' },
        { name: 'React', icon: 'devicon-react-original colored' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        { name: 'HTML5', icon: 'devicon-html5-plain colored' },
        { name: 'CSS3', icon: 'devicon-css3-plain colored' },
        { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored' },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' },
        { name: 'MUI', icon: 'devicon-materialui-plain colored' },
      ],
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'primary'
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'Express.js', icon: 'devicon-express-original' },
      ],
      color: 'from-green-500 to-emerald-500',
      glowColor: 'secondary'
    },
    {
      category: 'Database',
      items: [
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'Supabase', icon: 'devicon-supabase-plain colored' },
      ],
      color: 'from-purple-500 to-pink-500',
      glowColor: 'accent'
    },
    {
      category: 'Tools & Others',
      items: [
        { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
        { name: 'Git', icon: 'devicon-git-plain colored' },
        { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
        { name: 'Figma', icon: 'devicon-figma-plain colored' },
        { name: 'Postman', icon: 'devicon-postman-plain colored' },
        { name: 'Canva', icon: 'devicon-canva-original colored' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <AnimatedSection
              key={skill.category}
              animation="fadeInUp"
              delay={index * 0.1}
            >
              <GlowingCard glowColor={skill.glowColor} className="h-full">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl h-full">
                  <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${skill.color} mb-6`} />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
                    {skill.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {skill.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.08, y: -3 }}
                        className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-200 cursor-default"
                      >
                        <i className={`${item.icon} text-2xl`} />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlowingCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;