import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen, Activity, Code2, Flame } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10) || 0;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = (end - start) / totalSteps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const GitHubStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      label: 'Public Repositories',
      value: stats.totalRepos,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Total Stars',
      value: stats.totalStars,
      icon: Star,
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Contributions (1 Yr)',
      value: stats.totalContributions || 0,
      icon: Flame,
      color: 'from-emerald-400 to-teal-500',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Active Days (30D)',
      value: stats.activeDays30 || 0,
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-5 rounded-2xl bg-white/40 dark:bg-dark-800/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl ${card.bgColor} ${card.textColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                <AnimatedCounter value={card.value} />
              </div>
              {/* Subtle hover gradient bottom border */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Language Breakdown Bar */}
      {stats.languages && stats.languages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/40 dark:bg-dark-800/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-500" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Most Used Languages
              </h3>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Based on repository frequency
            </span>
          </div>

          {/* Multi-segmented Progress Bar */}
          <div className="h-3.5 w-full bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden flex gap-0.5 p-0.5">
            {stats.languages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                className="h-full rounded-sm transition-all duration-500 hover:opacity-90 relative group"
                title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
              />
            ))}
          </div>

          {/* Language Legend Pills */}
          <div className="flex flex-wrap items-center gap-3 md:gap-6 pt-1">
            {stats.languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 text-xs md:text-sm">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {lang.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GitHubStats;
