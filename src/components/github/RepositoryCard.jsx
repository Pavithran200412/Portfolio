import { motion } from 'framer-motion';
import {
  Star,
  GitFork,
  ExternalLink,
  CircleDot,
  Scale,
  HardDrive,
  Clock,
  Sparkles
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { GITHUB_CONFIG } from '../../config/githubConfig';

const formatSize = (kb) => {
  if (!kb) return '0 KB';
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

const RepositoryCard = ({ repo, isFeatured = false, index = 0 }) => {
  const languageColor =
    repo.language && GITHUB_CONFIG.languageColors[repo.language]
      ? GITHUB_CONFIG.languageColors[repo.language]
      : GITHUB_CONFIG.languageColors.Default;

  const hasHomepage = Boolean(repo.homepage && repo.homepage.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col justify-between p-6 rounded-2xl bg-white/40 dark:bg-dark-800/40 backdrop-blur-xl border transition-all duration-300 shadow-lg hover:shadow-2xl group ${
        isFeatured
          ? 'border-primary-500/50 dark:border-primary-500/40 ring-1 ring-primary-500/20 shadow-primary-500/10'
          : 'border-white/40 dark:border-white/10 hover:border-primary-500/30'
      }`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-3 left-6 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold shadow-md">
          <Sparkles className="w-3 h-3" />
          <span>Featured Project</span>
        </div>
      )}

      {/* Top Section */}
      <div className="space-y-3">
        {/* Title & Language */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:underline"
            >
              {repo.name}
            </a>
          </h3>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {repo.fork && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <GitFork className="w-3 h-3" />
                Fork
              </span>
            )}
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100/80 dark:bg-dark-900/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: languageColor }}
                />
                {repo.language}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {repo.description || 'No description provided.'}
        </p>

        {/* Topics / Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
              >
                #{topic}
              </span>
            ))}
            {repo.topics.length > 4 && (
              <span className="px-1.5 py-0.5 text-[11px] text-gray-400">
                +{repo.topics.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Meta & Actions */}
      <div className="space-y-4 pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        {/* Repo Stats Row */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-1 font-medium hover:text-amber-500 transition-colors"
              title={`${repo.stargazers_count} stars`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {repo.stargazers_count}
            </span>
            <span
              className="flex items-center gap-1 font-medium hover:text-emerald-500 transition-colors"
              title={`${repo.forks_count} forks`}
            >
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </span>
            {repo.open_issues_count > 0 && (
              <span
                className="flex items-center gap-1 font-medium hover:text-rose-500 transition-colors"
                title={`${repo.open_issues_count} open issues`}
              >
                <CircleDot className="w-3.5 h-3.5 text-rose-500" />
                {repo.open_issues_count}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {repo.license && (
              <span
                className="flex items-center gap-1 truncate max-w-[100px]"
                title={repo.license.name || repo.license.spdx_id}
              >
                <Scale className="w-3.5 h-3.5" />
                {repo.license.spdx_id || repo.license.name}
              </span>
            )}
            <span className="flex items-center gap-1" title={`Size: ${repo.size} KB`}>
              <HardDrive className="w-3.5 h-3.5" />
              {formatSize(repo.size)}
            </span>
            <span
              className="flex items-center gap-1"
              title={`Updated at ${new Date(repo.updated_at).toLocaleDateString()}`}
            >
              <Clock className="w-3.5 h-3.5" />
              {formatRelativeTime(repo.updated_at)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-dark-900 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors border border-gray-200 dark:border-gray-700/60"
          >
            <FiGithub className="w-3.5 h-3.5" />
            <span>Repository</span>
          </a>

          {hasHomepage && (
            <a
              href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RepositoryCard;
