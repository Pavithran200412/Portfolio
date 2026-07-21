import { Search, Filter, ArrowUpDown, X, GitFork } from 'lucide-react';

const RepositoryFilters = ({
  searchQuery,
  setSearchQuery,
  selectedLanguage,
  setSelectedLanguage,
  availableLanguages = [],
  filterType = 'all',
  setFilterType,
  sortBy,
  setSortBy,
  totalCount = 0,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/40 dark:bg-dark-800/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/60 dark:bg-dark-900/60 border border-gray-200 dark:border-gray-700/60 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Repo Type Filter (All / Sources / Forks) */}
        {setFilterType && (
          <div className="relative flex items-center">
            <GitFork className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl bg-white/60 dark:bg-dark-900/60 border border-gray-200 dark:border-gray-700/60 text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer appearance-none"
            >
              <option value="all" className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
                All Repositories
              </option>
              <option value="sources" className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
                Sources Only
              </option>
              <option value="forks" className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
                Forks Only
              </option>
            </select>
          </div>
        )}

        {/* Language Filter Dropdown */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-xl bg-white/60 dark:bg-dark-900/60 border border-gray-200 dark:border-gray-700/60 text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer appearance-none"
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang} className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
                {lang === 'All' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-xl bg-white/60 dark:bg-dark-900/60 border border-gray-200 dark:border-gray-700/60 text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer appearance-none"
          >
            <option value="updated" className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
              Recently Updated
            </option>
            <option value="stars" className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
              Most Stars
            </option>
            <option value="name" className="bg-white dark:bg-dark-800 text-gray-900 dark:text-white">
              Name (A–Z)
            </option>
          </select>
        </div>

        {/* Results Counter */}
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-dark-900/80 rounded-xl">
          {totalCount} {totalCount === 1 ? 'repo' : 'repos'}
        </div>
      </div>
    </div>
  );
};

export default RepositoryFilters;
