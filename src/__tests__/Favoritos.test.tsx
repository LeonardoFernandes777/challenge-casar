import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavoriteProvider, useFavorites } from '@/context';
import FavoritosPage from '@/app/favoritos/page';

jest.mock('@/context', () => ({
  useFavorites: jest.fn(),
  FavoriteProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockFavorites = [
  {
    id: 1,
    name: 'Test Repo 1',
    html_url: 'https://github.com/testuser/test-repo-1',
    description: 'This is the first test repository',
    language: 'TypeScript',
    updated_at: '2020-12-31T00:00:00Z',
  },
  {
    id: 2,
    name: 'Test Repo 2',
    html_url: 'https://github.com/testuser/test-repo-2',
    description: 'This is the second test repository',
    language: 'JavaScript',
    updated_at: '2020-12-31T00:00:00Z',
  },
];

describe('FavoritosPage', () => {
  it('renders message when there are no favorites', () => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites: [] });

    render(
      <FavoriteProvider>
        <FavoritosPage />
      </FavoriteProvider>
    );

    expect(screen.getByText('Adicione os melhores repositórios')).toBeInTheDocument();
  });

  it('renders favorite repositories', () => {
    (useFavorites as jest.Mock).mockReturnValue({ favorites: mockFavorites });

    render(
      <FavoriteProvider>
        <FavoritosPage />
      </FavoriteProvider>
    );

    expect(screen.getByText('Meus favoritos')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
  });
});
