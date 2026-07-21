const RepositorySkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between p-6 rounded-2xl bg-white/30 dark:bg-dark-800/30 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-md animate-pulse space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-1/2 bg-gray-300 dark:bg-dark-700 rounded-lg" />
              <div className="h-5 w-16 bg-gray-200 dark:bg-dark-700/60 rounded-full" />
            </div>
            <div className="h-4 w-full bg-gray-200 dark:bg-dark-700/60 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-dark-700/60 rounded" />
            <div className="flex gap-2 pt-2">
              <div className="h-4 w-12 bg-gray-200 dark:bg-dark-700/40 rounded" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-dark-700/40 rounded" />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200/40 dark:border-gray-700/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-dark-700/40 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-700/40 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 flex-1 bg-gray-300 dark:bg-dark-700 rounded-xl" />
              <div className="h-9 flex-1 bg-gray-200 dark:bg-dark-700/60 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositorySkeleton;
