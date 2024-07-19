import { render, screen, fireEvent } from '@testing-library/react';
import RepoCard from '../components/RepoCard';
import { RepoProps } from '@/types/types';
import { FavoriteProvider } from '@/context';

const repo: RepoProps = {
  id: 1,
  name: 'Test Repo',
  html_url: 'https://github.com/test/test-repo',
  description: 'This is a test repository',
  language: 'TypeScript',
  updated_at: '2020-12-31T00:00:00Z',
};

describe('RepoCard', () => {
  it('renders repository details correctly', () => {
    render(
      <FavoriteProvider>
        <RepoCard repo={repo} />
      </FavoriteProvider>
    );
    expect(screen.getByText('Test Repo')).toBeInTheDocument();
    expect(screen.getByText('This is a test repository')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText(/updated on/)).toBeInTheDocument();
  });

  it('toggles favorite state', () => {
    render(
      <FavoriteProvider>
        <RepoCard repo={repo} />
      </FavoriteProvider>
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);
    expect(favoriteButton.firstChild).toHaveClass('text-customBlue');

    fireEvent.click(favoriteButton);
    expect(favoriteButton.firstChild).toHaveClass('text-customGray');
  });
});
