"use client";

import { useFavorites } from "@/context";
import Link from "next/link";
import { IoHeartCircle } from 'react-icons/io5';

export default function FavoritosPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-customBlue font-semi-bold mb-4 mt-5">Adicione os melhores repositórios</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-white">
      <h1 className="text-2xl text-customBlue font-semi-bold mb-4 mt-5">Meus favoritos</h1>
      <ul className="w-full md:w-2/3 space-y-4 rounded-lg">
        {favorites.map((repo) => (
          <li key={repo.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
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
            <button onClick={() => toggleFavorite(repo)}>
                <IoHeartCircle className="text-customBlue w-8 h-8" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const languageColors: { [key: string]: string } = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  HTML: 'bg-red-500',
  Java: 'bg-orange-500',
  PHP: 'bg-purple-500'
};
