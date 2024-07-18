"use client"

import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";

export function NavBar() {
  const router = useRouter();

  function handleSearchUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username') as string;

    if (username) {
      router.push(`/profile/${username}`);
    }
  }

  return (
    <header className="border-b border-customWhite">
      <div className="flex items-center justify-between h-20">
        <div className="relative ml-4">
          <form onSubmit={handleSearchUser}>
            <input
              type="text"
              name="username"
              placeholder="Buscar usuário"
              className="sm:w-60 md:w-96 lg:w-128 p-2 pl-5 rounded-md border border-customWhite text-customGrayNeutral"
            />
            <button type='submit'>
              <FaSearch className="absolute right-3 top-2 text-customGray cursor-pointer" />
            </button>
          </form>
        </div>
        <button type="button" className="flex items-center bg-customBlue px-4 py-2 h-full cursor-pointer">
          <FaRegHeart className="text-white mr-2" size={'1.5rem'} />
          <span className="text-white">Favoritos</span>
        </button>
      </div>
    </header>
  );
}
