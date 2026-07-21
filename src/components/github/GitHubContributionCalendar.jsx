import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GITHUB_CONFIG } from '../../config/githubConfig';

const GitHubContributionCalendar = ({ username = GITHUB_CONFIG.username }) => {
  const { isDark } = useTheme();

  // Custom colors matching portfolio theme
  const explicitTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-2xl bg-white/40 dark:bg-dark-800/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg space-y-4 overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Contribution Activity
          </h3>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Past 12 Months
        </span>
      </div>

      <div className="flex justify-center items-center overflow-x-auto py-2 px-1 text-gray-900 dark:text-white scrollbar-thin scrollbar-thumb-gray-400">
        <GitHubCalendar
          username={username}
          colorScheme={isDark ? 'dark' : 'light'}
          theme={explicitTheme}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
        />
      </div>
    </motion.div>
  );
};

export default GitHubContributionCalendar;
