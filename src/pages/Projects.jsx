import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Here's a collection of projects I've worked on, showcasing my skills in web development, 
              user experience design, and problem-solving.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">View Details</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <FiGithub size={16} className="mr-1" />
                        Code
                      </a>
                      <a
                        href={project.demo}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <FiExternalLink size={16} className="mr-1" />
                        Demo
                      </a>
                    </div>
                  </div>
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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="relative">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {selectedProject.title}
                        </h2>
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                          {selectedProject.category}
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <a
                          href={selectedProject.github}
                          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <FiGithub className="mr-2" />
                          GitHub
                        </a>
                        <a
                          href={selectedProject.demo}
                          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <FiExternalLink className="mr-2" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {selectedProject.fullDesc}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProject.features.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;