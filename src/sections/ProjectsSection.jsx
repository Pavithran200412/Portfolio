import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiPlay } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'DormNest',
      shortDesc: 'Student Accommodation Management System',
      fullDesc: 'A comprehensive student accommodation management system designed to streamline the process of finding and managing student housing. Built with a modern tech stack including Java, Spring Boot and PostgreSQL. Features include user authentication, property listings, booking management,and an admin dashboard for managing properties and users.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH5Cf_LlgRH2M7uVV474n6mMbbW4DfiS2NHQ&s',
      tags: ['Java', 'Spring Boot', 'PostgreSQL'],
      github: 'https://github.com/Paramesh612/DormNest-OOAD-Project',
      demo: 'https://github.com/Paramesh612/DormNest-OOAD-Project',
      features: ['User Authentication', 'Property Listings', 'Booking Management', 'Admin Dashboard'],
      category: 'Java Spring Boot',
      color: 'primary'
    },
    {
      id: 2,
      title: 'RemoConnect',
      shortDesc: 'Remote Work Collaboration Platform',
      fullDesc: 'A cutting-edge remote work collaboration platform that integrates real-time communication.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAIiHmxrntQtwPht-ASiViBU-Ge4PfSRwdw&s',
      tags: ['Java','Spring Boot', 'Networking'],
      github: 'https://github.com/Pavithran200412/RemoConnect-Project-CN',
      demo: 'https://github.com/Pavithran200412/RemoConnect-Project-CN',
      features: ['Messaging', 'File Sharing','Screen Sharing'],
      category: 'Networking',
      color: 'secondary'
    },
    {
      id: 3,
      title: 'MedCare Hospital',
      shortDesc: 'Hospital management system',
      fullDesc: 'A comprehensive hospital management system website that allows patients to book appointments, view medical records, and communicate with healthcare providers. Built with React, Node.js, and MongoDB. Features include patient registration, appointment scheduling, doctor profiles. and a secure admin panel for managing hospital operations.',
      image: 'https://acropolium.com/img/articles/hospital-management-software/img01.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
      github: 'https://github.com/Pavithran200412/Hospital-Management-website',
      demo: 'https://github.com/Pavithran200412/Hospital-Management-website',
      features: ['Patient Registration', 'Appointment Scheduling', 'Doctor Profiles', 'Admin Panel'],
      category: 'Full Stack',
      color: 'accent'
    },
    {
      id: 4,
      title: 'App-Feature-Analysis-and-Comment-Driven-Rating',
      shortDesc: 'Decentralized Social Media Platform',
      fullDesc: 'A decentralized social media platform that allows users to analyze app features and provide ratings based on comments. Built with React, NLP, ML. Features include user authentication with MetaMask, smart contract integration for ratings, and decentralized storage of comments and ratings.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'NLP', 'ML'],
      github: 'https://github.com/Paramesh612/App-Feature-Analysis-and-Comment-Driven-Rating',
      demo: 'https://github.com/Paramesh612/App-Feature-Analysis-and-Comment-Driven-Rating',
      features: [ 'Comment Analysis', 'Rating System'],
      category: 'AI/ML',
      color: 'success'
    },
    {
      id: 5,
      title: 'SpaceShooter Game',
      shortDesc: 'Space-shooter game python',
      fullDesc: 'Space-shooter game built with Python, featuring hand tracking and spatial audio. Players can control their spaceship and experience immersive soundscapes as they navigate through space.',
      image: 'https://i.ytimg.com/vi/fBf-IznUHns/sddefault.jpg',
      tags: ['Python', 'Pygame', 'OpenCV', 'TensorFlow'],
      github: 'https://github.com/Pavithran200412/SpaceShooter_Game',
      demo: 'https://github.com/Pavithran200412/SpaceShooter_Game',
      features: ['Hand Tracking', 'Spatial Audio', 'Real-time Interaction'],
      category: '3D Graphics',
      color: 'secondary'
    }
  ];

  const categories = ['All', 'Full Stack', '3D Graphics', 'AI/ML'];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore my latest work featuring cutting-edge technologies, 3D graphics, AI integration, 
            and innovative user experiences.
          </motion.p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection animation="fadeInUp" delay={0.3} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <GlowingCard 
                  glowColor={project.color}
                  className="group cursor-pointer h-full overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                      >
                        <FiPlay className="text-white text-2xl" />
                      </motion.div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 bg-${project.color}-500/20 text-${project.color}-400 rounded-full text-sm font-medium backdrop-blur-sm`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs backdrop-blur-sm">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                      >
                        <FiGithub size={16} className="mr-1" />
                        Code
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                      >
                        <FiExternalLink size={16} className="mr-1" />
                        Demo
                      </motion.a>
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-dark-800/90 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                  />
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
                  >
                    <FiX size={20} />
                  </motion.button>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedProject.title}
                      </h2>
                      <span className={`px-3 py-1 bg-${selectedProject.color}-500/20 text-${selectedProject.color}-400 rounded-full text-sm font-medium`}>
                        {selectedProject.category}
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      <motion.a
                        href={selectedProject.github}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <FiGithub className="mr-2" />
                        GitHub
                      </motion.a>
                      <motion.a
                        href={selectedProject.demo}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300"
                      >
                        <FiExternalLink className="mr-2" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {selectedProject.fullDesc}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <motion.div 
                          key={feature} 
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                          <span className="text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm font-medium backdrop-blur-sm"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;