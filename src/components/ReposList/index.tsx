"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { RepoProps } from '@/types/types';
import RepoCard from '@/components/RepoCard';
import api from '@/services/api';

export async function fetchRepos(username: string, page: number): Promise<RepoProps[]> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const res = await fetch(`${api.baseURL}/${username}/repos?page=${page}&per_page=10`, {
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

  return (
    <div className="flex-grow p-4 md:p-6 bg-white rounded-lg border border-black-600 w-full lg:w-2/3">
      <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-customBlue mb-4">Repositórios</h3>
      {repos.length > 0 ? (
        <ul className="space-y-4">
          {repos.map((repo, index) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              ref={index === repos.length - 1 ? lastRepoElementRef : null}
            />
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
