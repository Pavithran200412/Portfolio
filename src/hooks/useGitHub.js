import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchUserProfile, fetchUserRepos, fetchUserContributions, calculateGitHubStats } from '../services/githubApi';
import { GITHUB_CONFIG } from '../config/githubConfig';

export const useGitHub = (username = GITHUB_CONFIG.username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contribData, setContribData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'sources' | 'forks'
  const [sortBy, setSortBy] = useState('updated'); // 'updated' | 'stars' | 'name'
  const [displayCount, setDisplayCount] = useState(GITHUB_CONFIG.itemsPerPage);

  const loadGitHubData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsRateLimited(false);

    try {
      const [profileRes, reposRes, contribsRes] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username),
        fetchUserContributions(username),
      ]);

      setProfile(profileRes.data);
      setRepos(reposRes.data);
      if (contribsRes) {
        setContribData(contribsRes);
      }

      if (profileRes.isRateLimited || reposRes.isRateLimited) {
        setIsRateLimited(true);
      }
    } catch (err) {
      console.error('useGitHub hook error:', err);
      setError(err.message || 'Failed to load GitHub data');
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadGitHubData();
  }, [loadGitHubData]);

  // Compute aggregated statistics
  const stats = useMemo(() => {
    return calculateGitHubStats(repos, profile, contribData);
  }, [repos, profile, contribData]);

  // List of all unique languages for the filter dropdown
  const availableLanguages = useMemo(() => {
    const langSet = new Set();
    repos.forEach((repo) => {
      if (repo.language) {
        langSet.add(repo.language);
      }
    });
    return ['All', ...Array.from(langSet).sort()];
  }, [repos]);

  // Identify featured repos based on configuration
  const featuredRepos = useMemo(() => {
    if (!repos.length) return [];
    return repos.filter((repo) =>
      GITHUB_CONFIG.featuredRepos.some(
        (featuredName) => featuredName.toLowerCase() === repo.name.toLowerCase()
      )
    );
  }, [repos]);

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    let result = [...repos];

    // Filter by search query (name or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(q) ||
          (repo.description && repo.description.toLowerCase().includes(q))
      );
    }

    // Filter by language
    if (selectedLanguage !== 'All') {
      result = result.filter((repo) => repo.language === selectedLanguage);
    }

    // Filter by source / fork type
    if (filterType === 'sources') {
      result = result.filter((repo) => !repo.fork);
    } else if (filterType === 'forks') {
      result = result.filter((repo) => repo.fork);
    }

    // Sort repos
    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // Default: recently updated
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return result;
  }, [repos, searchQuery, selectedLanguage, filterType, sortBy]);

  // Paginated/limited subset
  const visibleRepos = useMemo(() => {
    return filteredRepos.slice(0, displayCount);
  }, [filteredRepos, displayCount]);

  const hasMore = visibleRepos.length < filteredRepos.length;

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + GITHUB_CONFIG.itemsPerPage);
  }, []);

  const showAll = useCallback(() => {
    setDisplayCount(filteredRepos.length);
  }, [filteredRepos.length]);

  return {
    profile,
    allRepos: repos,
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
    refresh: loadGitHubData,
  };
};
