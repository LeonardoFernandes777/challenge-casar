"use client";

import Link from 'next/link';
import { forwardRef } from 'react';
import { IoHeartCircleOutline, IoHeartCircle } from 'react-icons/io5';
import { RepoProps } from '@/types/types';
import { useFavorites } from '@/context';

const languageColors: { [key: string]: string } = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  HTML: 'bg-red-500',
  Java: 'bg-orange-500',
  PHP: 'bg-purple-500'
};

const RepoCard = forwardRef<HTMLLIElement, { repo: RepoProps }>(({ repo }, ref) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <li ref={ref} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
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
      <button onClick={() => toggleFavorite(repo)} className="ml-4 p-2">
        {favorites.some(fav => fav.id === repo.id) ? (
          <IoHeartCircle className="text-customBlue w-8 h-8" />
        ) : (
          <IoHeartCircleOutline className="text-customGray w-8 h-8" />
        )}
      </button>
    </li>
  );
});

RepoCard.displayName = 'RepoCard';

export default RepoCard;
