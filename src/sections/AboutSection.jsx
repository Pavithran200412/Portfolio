import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiTarget, FiAward } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';
import EditableText from '../components/EditableText';
import { useContent } from '../context/ContentContext';

const AboutSection = () => {
  const { content, updateAbout } = useContent();

  const updateExperience = (index, field, value) => {
    const newExperience = [...content.about.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    updateAbout({ experience: newExperience });
  };

  const iconMap = {
    0: FiAward,
    1: FiTarget,
    2: FiHeart,
    3: FiUser
  };

  const colorMap = {
    0: 'primary',
    1: 'secondary',
    2: 'accent',
    3: 'success'
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm a passionate full-stack developer with a love for creating innovative solutions 
            and beautiful user experiences. Here's my journey and what drives me every day.
          </motion.p>
        </AnimatedSection>

        {/* Personal Story */}
        <AnimatedSection animation="fadeInUp" delay={0.3} className="mb-20">
          <GlowingCard className="p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FiUser className="text-6xl text-primary-400 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">My Story</h3>
              <div className="text-gray-300 leading-relaxed text-lg">
                <EditableText
                  value={content.about.story}
                  onSave={(value) => updateAbout({ story: value })}
                  multiline
                  className="text-gray-300 leading-relaxed text-lg"
                />
              </div>
            </motion.div>
          </GlowingCard>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection animation="fadeInUp" delay={0.5}>
          <h3 className="text-3xl font-bold text-center mb-12 text-white">My Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-1 bg-gradient-to-b from-primary-600 via-secondary-600 to-accent-600"></div>
            
            {content.about.experience.map((item, index) => {
              const Icon = iconMap[index] || FiUser;
              const color = colorMap[index] || 'primary';
              return (
                <motion.div
                  key={index}
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
                    className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full border-4 border-white/20 z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="text-white" size={16} />
                  </motion.div>
                  
                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <GlowingCard glowColor={color}>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className={`bg-${color}-500/20 text-${color}-400 px-3 py-1 rounded-full text-sm font-bold`}>
                            <EditableText
                              value={item.year}
                              onSave={(value) => updateExperience(index, 'year', value)}
                              className={`text-${color}-400`}
                            />
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          <EditableText
                            value={item.title}
                            onSave={(value) => updateExperience(index, 'title', value)}
                            className="text-xl font-bold text-white"
                          />
                        </h4>
                        <p className="text-primary-400 font-medium mb-3">
                          <EditableText
                            value={item.company}
                            onSave={(value) => updateExperience(index, 'company', value)}
                            className="text-primary-400 font-medium"
                          />
                        </p>
                        <div className="text-gray-400 leading-relaxed">
                          <EditableText
                            value={item.description}
                            onSave={(value) => updateExperience(index, 'description', value)}
                            multiline
                            className="text-gray-400 leading-relaxed"
                          />
                        </div>
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
          <GlowingCard className="p-8 md:p-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Let's Build Something Amazing Together</h3>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always excited to work on new projects and collaborate with fellow developers. 
                Whether it's a complex web application or a simple landing page, I bring passion and precision to every project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg"
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