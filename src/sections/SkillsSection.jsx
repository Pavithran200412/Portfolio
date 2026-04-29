import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const SkillsSection = () => {
  const skills = [
    {
      category: 'Languages & Frontend',
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
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'Express.js', icon: 'devicon-express-original' },
      ],
    },
    {
      category: 'Database',
      items: [
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'Supabase', icon: 'devicon-supabase-plain colored' },
      ],
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
    }
  ];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & <span className="text-primary-400">Technologies</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Technologies and tools I work with to bring ideas to life.
          </motion.p>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <AnimatedSection
              key={skill.category}
              animation="fadeInUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-primary-500/20 transition-all duration-300 h-full"
              >
                <h3 className="text-base font-bold text-white mb-5 pb-3 border-b border-gray-800">
                  {skill.category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skill.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.06 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-2 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-default"
                    >
                      <i className={`${item.icon} text-2xl`} />
                      <span className="text-xs font-medium text-gray-400 text-center leading-tight">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;