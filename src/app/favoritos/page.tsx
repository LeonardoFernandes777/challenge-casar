"use client";

import { useFavorites } from "@/context";
import RepoCard from '@/components/RepoCard';

export default function FavoritosPage() {
  const { favorites } = useFavorites();

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
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
