import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiPlay } from 'react-icons/fi';
import AnimatedSection from '../components/AnimatedSection';
import GlowingCard from '../components/GlowingCard';

const GITHUB_USERNAME = 'Pavithran200412'; // your GitHub username
const REPO_LIMIT = 10; // limit the number of repos to display

const topicToCategoryMap = {
  fullstack: 'Full Stack',
  frontend: 'Frontend',
  backend: 'Full Stack',
  threejs: '3D Graphics',
  webgl: '3D Graphics',
  blockchain: 'Blockchain',
  solidity: 'Blockchain',
  ai: 'AI/ML',
  ml: 'AI/ML',
  'machine-learning': 'AI/ML',
  vr: '3D Graphics',
};
const getCategoryFromTopics = (topics) => {
  for (const topic of topics) {
    const key = topic.toLowerCase();
    if (topicToCategoryMap[key]) return topicToCategoryMap[key];
  }
  return 'Full Stack'; // default
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
      const data = await response.json();

      const limitedRepos = data.slice(0, REPO_LIMIT).map((repo) => ({
        id: repo.id,
        title: repo.name,
        shortDesc: repo.description || 'No description provided.',
        fullDesc: repo.description || 'No detailed description available.',
        image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
        tags: repo.topics || [],
        github: repo.html_url,
        demo: repo.homepage || repo.html_url,
        features: ['Open Source', 'GitHub Integration', 'Auto-generated'], // example
        category: getCategoryFromTopics(repo.topics || []),
        color: 'primary',
      }));

      setProjects(limitedRepos);
    };

    fetchGitHubRepos();
  }, []);

  const categories = ['All', 'Full Stack', 'Frontend', '3D Graphics', 'Blockchain', 'AI/ML'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header and Category Filter */}
        {/* Keep your header and category button JSX unchanged here... */}

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

        {/* Modal component logic remains unchanged */}
      </div>
    </section>
  );
};

export default ProjectsSection;
