"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { RepoProps } from '@/types/user';
import { IoHeartCircleOutline, IoHeartCircle } from 'react-icons/io5';

async function fetchRepos(username: string, page: number): Promise<RepoProps[]> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  console.log('TOKEN', GITHUB_TOKEN)
  const res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=10`, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch repositories: ${res.status}`);
  }
  return res.json();
}

export default function ReposList({ initialRepos, username }: { initialRepos: RepoProps[], username: string }) {
  const [repos, setRepos] = useState<RepoProps[]>(initialRepos);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRepoElementRef = useRef<HTMLLIElement | null>(null);

  const loadMoreRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newRepos = await fetchRepos(username, page);
      if (newRepos.length === 0) {
        setHasMore(false);
      } else {
        setRepos((prevRepos) => [...prevRepos, ...newRepos]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError('Failed to load repositories');
      console.error(error);
    }
    setLoading(false);
  }, [page, username]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreRepos();
      }
    });

    if (lastRepoElementRef.current) {
      observer.current.observe(lastRepoElementRef.current);
    }
  }, [loading, hasMore, loadMoreRepos]);

  const handleFavorite = (repoId: number) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [repoId]: !prevFavorites[repoId],
    }));
  };

  const languageColors: { [key: string]: string } = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-500',
    Python: 'bg-green-500',
    HTML: 'bg-red-500',
    Java: 'bg-orange-500',
    PHP: 'bg-purple-500'
  };

  return (
    <div className="flex-grow p-4 md:p-6 bg-white rounded-lg border border-black-600 w-full lg:w-2/3">
      <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-customBlue mb-4">Repositórios</h3>
      {repos.length > 0 ? (
        <ul className="space-y-4">
          {repos.map((repo, index) => (
            <li
              key={repo.id}
              ref={index === repos.length - 1 ? lastRepoElementRef : null}
              className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <Link href={repo.html_url} legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" className="text-customGrayNeutral font-semibold">
                    {repo.name}
                  </a>
                </Link>
                <p className="text-customGray mt-2">{repo.description}</p>
                <div className="flex items-center mt-2">
                  <span className={`w-3 h-3 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`}></span>
                  <p className="text-customGrayNeutral-600 ml-2">{repo.language}</p>
                  <p className="text-customGrayNeutral-600 ml-5">updated on {new Date(repo.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button onClick={() => handleFavorite(repo.id)} className="ml-4 p-2">
                {favorites[repo.id] ? (
                  <IoHeartCircle className="text-customBlue w-8 h-8" />
                ) : (
                  <IoHeartCircleOutline className="text-customGray w-8 h-8" />
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Este usuário não possui repositórios públicos.</p>
      )}
      {loading && (
        <div className="flex justify-center mt-4">
          <p>Carregando...</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
