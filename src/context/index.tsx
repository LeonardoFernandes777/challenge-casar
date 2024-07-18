"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from "react";

export type RepoProps = {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    updated_at: string;
};

type FavoriteContextType = {
    favorites: RepoProps[];
    toggleFavorite: (repo: RepoProps) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<RepoProps[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (repo: RepoProps) => {
        setFavorites((prevFavorites) => {
            const isFavorited = prevFavorites.some(
              (favorite) => favorite.id === repo.id
            );
            let updatedFavorites;
            if (isFavorited) {
              updatedFavorites = prevFavorites.filter(
                (favorite) => favorite.id !== repo.id
              );
            } else {
              updatedFavorites = [...prevFavorites, repo];
            }
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
          });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoriteProvider');
    }
    return context;
}
