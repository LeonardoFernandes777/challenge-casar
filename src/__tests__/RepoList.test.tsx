import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReposList, { fetchRepos } from '@/components/ReposList';
import { RepoProps } from '@/types/types';
import { FavoriteProvider } from '@/context';


jest.mock('@/components/ReposList', () => {
  const originalModule = jest.requireActual('@/components/ReposList');
  return {
    __esModule: true,
    ...originalModule,
    fetchRepos: jest.fn(),
  };
});

const mockRepos: RepoProps[] = [
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

describe('ReposList', () => {
  beforeEach(() => {
    (fetchRepos as jest.Mock).mockResolvedValue(mockRepos);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial repositories', async () => {
    render(
      <FavoriteProvider>
        <ReposList initialRepos={mockRepos} username="testuser" />
      </FavoriteProvider>
    );

    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    (fetchRepos as jest.Mock).mockRejectedValueOnce(new Error('Failed to load repositories'));

    render(
      <FavoriteProvider>
        <ReposList initialRepos={mockRepos} username="testuser" />
      </FavoriteProvider>
    );

    const lastRepo = screen.getByText('Test Repo 2');
    lastRepo.scrollIntoView = jest.fn();

    await act(async () => {
      // Trigger the IntersectionObserver callback
      const observerInstance = (window.IntersectionObserver as any).mock.instances[0];
      observerInstance.callback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load repositories')).toBeInTheDocument();
    });
  });
});
