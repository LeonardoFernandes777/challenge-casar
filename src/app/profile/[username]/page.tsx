import { PageSearchNotFound } from '@/components/PageSearchNotFound';
import RepoList from '@/components/ReposList';
import { RepoProps, UserProps } from '@/types/types';
import Image from 'next/image';
import api from '@/services/api';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchUserData(username: string): Promise<{ user: UserProps | null, repos: RepoProps[] | null }> {
  
  console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN);

  try {
    const userRes = await fetch(`${api.baseURL}/${username}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    if (!userRes.ok) {
      throw new Error(`Failed to fetch user data: ${userRes.status}`);
    }
    const user = await userRes.json();

    const reposRes = await fetch(`${api.baseURL}/${username}/repos?per_page=10&page=1`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repositories: ${reposRes.status}`);
    }
    const repos = await reposRes.json();

    return { user, repos };
  } catch (error) {
    console.error(error);
    return { user: null, repos: null };
  }
}

export default async function PageProfile({ params }: { params: { username: string } }) {
  const { user, repos } = await fetchUserData(params.username);

  if (!user) {
    return (
      <main className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <PageSearchNotFound search={params.username} />
      </main>
    );
  }

  return (
    <main className="flex flex-col lg:flex-row gap-8 p-4 md:p-8">
      <div className="flex-shrink-0 p-4 md:p-6 bg-white rounded-lg border border-black-600 w-full lg:w-1/3  sm:max-h-[300px] md:max-h-[400px] lg:max-h-[430px]">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
            <Image src={user.avatar_url} width={150} height={150} alt={user.login} className="object-cover w-full h-full" priority/>
          </div>
          <h2 className="text-lg md:text-xl font-bold mt-4 text-center">{user.name}</h2>
          <p className="text-gray-600 text-center mt-5">@{user.login}</p>
          <p className="text-gray-600 text-center mt-2">{user.bio}</p>
        </div>
      </div>
        <RepoList initialRepos={repos || []} username={params.username} />
    </main>
  );
}
