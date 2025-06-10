import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      shortDesc: 'Modern e-commerce solution with React and Node.js',
      fullDesc: 'A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. The application is fully responsive and optimized for performance.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
      github: 'https://github.com',
      demo: 'https://example.com',
      features: ['User Authentication', 'Payment Integration', 'Admin Dashboard', 'Responsive Design'],
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      shortDesc: 'Collaborative task management with real-time updates',
      fullDesc: 'A real-time collaborative task management application built with React and Firebase. Features include drag-and-drop task boards, real-time collaboration, file attachments, comments, due dates, and team management. The app uses Firebase for real-time database and authentication.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Firebase', 'Material-UI', 'Real-time'],
      github: 'https://github.com',
      demo: 'https://example.com',
      features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration', 'File Attachments'],
      category: 'Frontend'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      shortDesc: 'Beautiful weather app with advanced forecasting',
      fullDesc: 'A sophisticated weather dashboard application that provides current weather conditions, 7-day forecasts, and weather maps. Built with React and integrated with multiple weather APIs for accurate data. Features include location-based weather, favorite locations, weather alerts, and beautiful animated backgrounds.',
      image: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Weather API', 'Charts.js', 'Geolocation'],
      github: 'https://github.com',
      demo: 'https://example.com',
      features: ['7-Day Forecast', 'Interactive Maps', 'Weather Alerts', 'Location Detection'],
      category: 'Frontend'
    },
    {
      id: 4,
      title: 'Social Media API',
      shortDesc: 'RESTful API for social media platform',
      fullDesc: 'A robust RESTful API for a social media platform built with Node.js, Express, and PostgreSQL. Features include user authentication with JWT, post creation and management, real-time messaging, file uploads, friend system, and comprehensive API documentation with Swagger.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
      github: 'https://github.com',
      demo: 'https://example.com',
      features: ['JWT Authentication', 'Real-time Messaging', 'File Uploads', 'API Documentation'],
      category: 'Backend'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      shortDesc: 'Responsive portfolio with modern animations',
      fullDesc: 'A modern, responsive portfolio website built with React and Framer Motion. Features include smooth page transitions, interactive animations, particle background effects, dark/light mode toggle, and optimized performance. The site showcases projects, skills, and provides an easy way for clients to get in touch.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Framer Motion', 'Tailwind CSS', 'Responsive'],
      github: 'https://github.com',
      demo: 'https://example.com',
      features: ['Smooth Animations', 'Dark Mode', 'Particle Effects', 'Mobile Optimized'],
      category: 'Frontend'
    },
    {
      id: 6,
      title: 'Blog CMS',
      shortDesc: 'Content management system for blogs',
      fullDesc: 'A comprehensive content management system for blogs built with React, Node.js, and MongoDB. Features include rich text editor, media management, SEO optimization, comment system, user roles, analytics dashboard, and automated backups. The system is designed for both technical and non-technical users.',
      image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'MongoDB', 'Rich Editor', 'SEO'],
      github: 'https://github.com',
      demo: 'https://example.com',
      features: ['Rich Text Editor', 'SEO Optimization', 'Analytics', 'User Roles'],
      category: 'Full Stack'
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];
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