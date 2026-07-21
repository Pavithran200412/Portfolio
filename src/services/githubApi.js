import { GITHUB_CONFIG } from '../config/githubConfig';

const CACHE_KEYS = {
  PROFILE: (username) => `gh_profile_${GITHUB_CONFIG.cacheVersion}_${username}`,
  REPOS: (username) => `gh_repos_${GITHUB_CONFIG.cacheVersion}_${username}`,
  CONTRIBUTIONS: (username) => `gh_contribs_${GITHUB_CONFIG.cacheVersion}_${username}`,
};

/**
 * Reads cached item from localStorage if available and not expired.
 */
const getCache = (key) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now - item.timestamp > GITHUB_CONFIG.cacheTTL) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  } catch (err) {
    console.warn('Failed to read from localStorage cache:', err);
    return null;
  }
};

/**
 * Saves item to localStorage with current timestamp.
 */
const setCache = (key, data) => {
  try {
    const item = {
      timestamp: new Date().getTime(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.warn('Failed to write to localStorage cache:', err);
  }
};

/**
 * Fetches GitHub user profile details with caching & error handling.
 */
export const fetchUserProfile = async (username = GITHUB_CONFIG.username) => {
  const cacheKey = CACHE_KEYS.PROFILE(username);
  const cachedProfile = getCache(cacheKey);
  if (cachedProfile) {
    return { data: cachedProfile, isCached: true };
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.status === 403 || response.status === 429) {
      const fallback = localStorage.getItem(cacheKey);
      if (fallback) {
        return { data: JSON.parse(fallback).data, isCached: true, isRateLimited: true };
      }
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub profile (Status: ${response.status})`);
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return { data, isCached: false };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw error;
  }
};

/**
 * Fetches public repositories for a GitHub user across pages with caching & filtering.
 */
export const fetchUserRepos = async (username = GITHUB_CONFIG.username) => {
  const cacheKey = CACHE_KEYS.REPOS(username);
  const cachedRepos = getCache(cacheKey);
  if (cachedRepos) {
    return { data: cachedRepos, isCached: true };
  }

  try {
    let allRawRepos = [];
    let page = 1;
    let keepFetching = true;

    while (keepFetching) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`
      );

      if (response.status === 403 || response.status === 429) {
        const fallback = localStorage.getItem(cacheKey);
        if (fallback) {
          return { data: JSON.parse(fallback).data, isCached: true, isRateLimited: true };
        }
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub repositories (Status: ${response.status})`);
      }

      const rawRepos = await response.json();
      if (!Array.isArray(rawRepos) || rawRepos.length === 0) {
        keepFetching = false;
      } else {
        allRawRepos = [...allRawRepos, ...rawRepos];
        if (rawRepos.length < 100) {
          keepFetching = false;
        } else {
          page++;
        }
      }
    }

    // Filter out archived or private repos (keep both source & forked public repos)
    const filteredRepos = allRawRepos.filter(
      (repo) => !repo.archived && !repo.private
    );

    setCache(cacheKey, filteredRepos);
    return { data: filteredRepos, isCached: false };
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};

/**
 * Fetches contribution metrics (annual total, active days, 30-day active days).
 */
export const fetchUserContributions = async (username = GITHUB_CONFIG.username) => {
  const cacheKey = CACHE_KEYS.CONTRIBUTIONS(username);
  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!res.ok) throw new Error('Failed to fetch contribution API');
    const json = await res.json();

    const totalContributions = json.total?.lastYear || (json.contributions || []).reduce((acc, c) => acc + c.count, 0);
    const activeDaysYear = (json.contributions || []).filter((c) => c.count > 0).length;

    const last30Days = (json.contributions || []).slice(-30);
    const activeDays30 = last30Days.filter((c) => c.count > 0).length;
    const contributions30 = last30Days.reduce((acc, c) => acc + c.count, 0);

    const contribData = {
      totalContributions,
      activeDaysYear,
      activeDays30,
      contributions30,
    };

    setCache(cacheKey, contribData);
    return contribData;
  } catch (err) {
    console.warn('Failed to fetch contributions metrics:', err);
    return null;
  }
};

/**
 * Computes aggregated statistics from repository list, profile, and contributions data.
 */
export const calculateGitHubStats = (repos = [], profile = null, contribData = null) => {
  const totalRepos = profile?.public_repos || repos.length;
  const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

  // Language frequency & percentage breakdown
  const languageCounts = {};
  let reposWithLang = 0;

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      reposWithLang++;
    }
  });

  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: reposWithLang > 0 ? Math.round((count / reposWithLang) * 100) : 0,
      color: GITHUB_CONFIG.languageColors[name] || GITHUB_CONFIG.languageColors.Default,
    }))
    .sort((a, b) => b.count - a.count);

  // Recent activity: repos updated in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentlyUpdatedCount = repos.filter(
    (repo) => new Date(repo.updated_at) >= thirtyDaysAgo
  ).length;

  const latestRepo = repos.length > 0 ? repos[0] : null;

  return {
    totalRepos,
    totalStars,
    totalForks,
    languages: languages.slice(0, 5), // Top 5 languages
    recentlyUpdatedCount,
    latestRepo,
    totalContributions: contribData?.totalContributions || 0,
    activeDaysYear: contribData?.activeDaysYear || 0,
    activeDays30: contribData?.activeDays30 ?? recentlyUpdatedCount,
    contributions30: contribData?.contributions30 || 0,
  };
};
