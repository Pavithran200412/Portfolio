export const GITHUB_CONFIG = {
  username: import.meta.env.VITE_GITHUB_USERNAME || 'Pavithran200412',
  featuredRepos: [
    'RemoConnect-Project-CN',
    'Hospital-Management-website',
    'ats-resume-optimizer',
    'Inventory-Warehouse-Management-System',
    'Resilient-SOS',
    'Meet-AI',
    'App-feature-Fn',
    'ProblemPulse-AI'
  ],
  cacheTTL: 15 * 60 * 1000, // 15 minutes in ms
  itemsPerPage: 12,
  includeForks: true, // Default to showing all public repos (with optional filter toggle)
  cacheVersion: 'v2',
  languageColors: {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Java: '#b07219',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'C++': '#f34b7d',
    'C#': '#178600',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Rust: '#dea584',
    Shell: '#89e051',
    Vue: '#41b883',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    'Jupyter Notebook': '#DA5B0B',
    Default: '#3B82F6'
  }
};
