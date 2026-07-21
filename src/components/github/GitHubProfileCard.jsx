import { motion } from 'framer-motion';
import {
  Users,
  MapPin,
  Building,
  Globe,
  Calendar,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

const GitHubProfileCard = ({ profile }) => {
  if (!profile) return null;

  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-white/40 dark:bg-dark-800/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-dark-900/50 group"
    >
      {/* Dynamic Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl pointer-events-none group-hover:opacity-75 transition-opacity duration-700" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl pointer-events-none group-hover:opacity-75 transition-opacity duration-700" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        {/* Profile Avatar */}
        <div className="relative group/avatar flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-sm opacity-70 group-hover/avatar:opacity-100 transition duration-500" />
          <img
            src={profile.avatar_url}
            alt={`${profile.name || profile.login}'s avatar`}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white dark:border-dark-800 shadow-lg"
          />
        </div>

        {/* Profile Meta */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 dark:from-white dark:via-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                {profile.name || profile.login}
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                @{profile.login}
              </p>
            </div>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FiGithub className="w-4 h-4" />
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-xs md:text-sm pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
              <BookOpen className="w-4 h-4 text-primary-500" />
              <span className="font-bold text-gray-900 dark:text-white">{profile.public_repos}</span> Repos
            </div>
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
              <Users className="w-4 h-4 text-secondary-500" />
              <span className="font-bold text-gray-900 dark:text-white">{profile.followers}</span> Followers
            </div>
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
              <Users className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-gray-900 dark:text-white">{profile.following}</span> Following
            </div>
          </div>

          {/* Location, Company, Website, Join Date */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-gray-600 dark:text-gray-400">
            {profile.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.company && (
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                <span>{profile.company}</span>
              </div>
            )}
            {profile.blog && (
              <a
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span className="truncate max-w-[200px]">{profile.blog.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>Joined {joinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubProfileCard;
