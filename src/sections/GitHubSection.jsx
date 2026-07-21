import { motion } from 'framer-motion';
import { useGitHub } from '../hooks/useGitHub';
import AnimatedSection from '../components/AnimatedSection';
import GitHubProfileCard from '../components/github/GitHubProfileCard';
import GitHubStats from '../components/github/GitHubStats';
import GitHubContributionCalendar from '../components/github/GitHubContributionCalendar';
import RepositoryFilters from '../components/github/RepositoryFilters';
import RepositoryCard from '../components/github/RepositoryCard';
import RepositorySkeleton from '../components/github/RepositorySkeleton';
import { AlertCircle, RefreshCw, FolderGit2, Sparkles, ChevronDown } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

const GitHubSection = () => {
  const {
    profile,
    featuredRepos,
    filteredRepos,
    visibleRepos,
    stats,
    availableLanguages,
    loading,
    error,
    isRateLimited,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    hasMore,
    loadMore,
    showAll,
    refresh,
  } = useGitHub();

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <AnimatedSection className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 dark:text-primary-400 text-xs md:text-sm font-semibold">
            <FiGithub className="w-4 h-4" />
            <span>Open Source Activity</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            GitHub <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Showcase</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Explore live public repositories, statistics, language metrics, and open-source contributions directly synchronized with GitHub.
          </p>
        </AnimatedSection>

        {/* Rate Limit or Error Warning Banner */}
        {(isRateLimited || error) && (
          <AnimatedSection animation="fadeInUp">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-xs md:text-sm">
                  {isRateLimited
                    ? 'GitHub API rate limit reached. Displaying cached repositories and profile data.'
                    : error}
                </p>
              </div>
              <button
                onClick={refresh}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          </AnimatedSection>
        )}

        {/* GitHub Profile Card */}
        {loading ? (
          <div className="h-44 rounded-2xl bg-white/20 dark:bg-dark-800/20 animate-pulse border border-white/20 dark:border-white/5" />
        ) : (
          profile && (
            <AnimatedSection animation="fadeInUp">
              <GitHubProfileCard profile={profile} />
            </AnimatedSection>
          )
        )}

        {/* GitHub Statistics */}
        {!loading && stats && (
          <AnimatedSection animation="fadeInUp">
            <GitHubStats stats={stats} />
          </AnimatedSection>
        )}

        {/* Contribution Calendar */}
        <AnimatedSection animation="fadeInUp">
          <GitHubContributionCalendar />
        </AnimatedSection>

        {/* Featured Projects Grid (Only show if featured repos exist & no search filter active) */}
        {!loading && featuredRepos.length > 0 && !searchQuery && selectedLanguage === 'All' && (
          <AnimatedSection animation="fadeInUp" className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200/50 dark:border-gray-700/50 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Featured Repositories
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredRepos.map((repo, idx) => (
                <RepositoryCard key={repo.id} repo={repo} isFeatured={true} index={idx} />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Repository Filters & Grid */}
        <AnimatedSection animation="fadeInUp" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-200/50 dark:border-gray-700/50 pb-3">
            <FolderGit2 className="w-5 h-5 text-primary-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Public Repositories
            </h3>
          </div>

          {/* Filters */}
          <RepositoryFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            filterType={filterType}
            setFilterType={setFilterType}
            availableLanguages={availableLanguages}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalCount={filteredRepos.length}
          />

          {/* Repositories Grid / Skeleton / Empty State */}
          {loading ? (
            <RepositorySkeleton count={6} />
          ) : visibleRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleRepos.map((repo, idx) => (
                <RepositoryCard key={repo.id} repo={repo} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl bg-white/30 dark:bg-dark-800/30 backdrop-blur-xl border border-white/20 dark:border-white/5 space-y-3">
              <FolderGit2 className="w-12 h-12 text-gray-400 mx-auto opacity-60" />
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                No repositories found
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                No public repositories match your current filter settings. Try adjusting your search term or clearing the language filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLanguage('All');
                  setFilterType('all');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-primary-500 bg-primary-500/10 hover:bg-primary-500/20 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Load More & Show All Buttons */}
          {!loading && hasMore && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg shadow-primary-500/20 transition-all"
              >
                <span>Load More Repositories</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showAll}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-dark-900 hover:bg-gray-200 dark:hover:bg-dark-700 transition-all border border-gray-200 dark:border-gray-700/60"
              >
                <span>Show All ({filteredRepos.length})</span>
              </motion.button>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GitHubSection;
