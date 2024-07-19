"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

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
        <div className="relative ml-2 sm:ml-2 md:ml-5 lg-5" >
          <form onSubmit={handleSearchUser}>
            <input
              maxLength={24}
              type="text"
              name="username"
              placeholder="Buscar usuário"
              className="w-60 sm:w-60 md:w-96 lg:w-128 p-2 pl-9 rounded-md border border-customWhite text-customGrayNeutral text-sm sm:text-sm"
            />
            <button type='submit'>
              <FaSearch className="absolute right-2 top-2 text-customGray cursor-pointer" />
            </button>
            <Link href="/" className="absolute left-1 top-1 cursor-pointer">
                <FaHome className="text-customGray mr-2" size={'1.5rem'} />
            </Link>
          </form>
          
        </div>
        <Link href="/favoritos" className="flex items-center bg-customBlue px-2 py-2 h-full cursor-pointer ml-5">
          <FaRegHeart className="text-white mr-2" size={'1.5rem'} />
          <span className="text-white">Favoritos</span>
        </Link>
      </div>
    </header>
  );
}
