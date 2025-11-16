import React from 'react';
import SearchBar from '@/components/ui/SearchBar';
import MenuIcon from '@/assets/icons/menu.svg?react';

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => (
  <header className="flex-between-center fixed top-0 right-0 left-0 z-10 gap-3 bg-white px-6 py-3 md:relative md:top-auto md:right-auto md:bg-transparent md:py-2">
    <div className="flex items-center gap-x-3">
      <button
        className="flex-center md:hidden"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="開啟側欄"
      >
        <MenuIcon className="size-4" />
      </button>
      <SearchBar className="hidden md:block" />
    </div>
    <SearchBar className="md:hidden" />
    <div className="hidden items-center gap-x-3 md:flex">
      <a
        href="https://kir4che.com"
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-gray-600 transition hover:border-pink-300 hover:text-pink-600"
      >
        Blog
      </a>
      <a
        href="https://github.com/kir4che"
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-gray-600 transition hover:border-pink-300 hover:text-pink-600"
      >
        GitHub
      </a>
    </div>
  </header>
);

export default Header;
