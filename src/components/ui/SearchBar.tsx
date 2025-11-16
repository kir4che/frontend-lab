import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { routeMeta } from '@/routes/meta';
import { cn } from '@/utils/cn';
import SearchIcon from '@/assets/icons/search.svg?react';
import XMarkIcon from '@/assets/icons/xmark.svg?react';

type SearchableRoute = (typeof routeMeta)[number] & { _search: string };

const searchableRoutes: SearchableRoute[] = routeMeta
  .filter((route) => route.category !== 'home')
  .map((r) => ({
    ...r,
    _search: [r.label, r.badge, r.category, r.path].filter(Boolean).join(' ').toLowerCase(),
  }));

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const blurTimeoutRef = useRef<number | null>(null);

  const clearBlurTimeout = () => {
    if (blurTimeoutRef.current !== null) {
      window.clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return clearBlurTimeout;
  }, []);

  const trimmedQuery = useMemo(() => query.trim().toLowerCase(), [query]);

  const results = useMemo(
    () =>
      !trimmedQuery ? [] : searchableRoutes.filter((route) => route._search.includes(trimmedQuery)),
    [trimmedQuery],
  );

  const handleFocus = () => {
    clearBlurTimeout();
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = window.setTimeout(() => setIsDropdownOpen(false), 120);
  };

  const handleSelect = (path: string) => {
    setQuery('');
    setIsDropdownOpen(false);
    navigate(path);
  };

  return (
    <div className={cn('relative w-full max-w-52', className)}>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search"
        aria-label="搜尋元件"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full rounded-full border border-pink-200 bg-white py-1.5 pr-10 pl-4 text-xs text-gray-800 transition focus:ring focus:ring-pink-200"
      />
      {trimmedQuery.length > 0 ? (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setQuery('');
            inputRef.current?.focus();
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2"
          aria-label="清除搜尋"
        >
          <XMarkIcon className="size-3.5" />
        </button>
      ) : (
        <SearchIcon className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2" />
      )}
      {isDropdownOpen && trimmedQuery.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-20 mt-1 max-h-64 space-y-1 overflow-y-auto rounded-xl bg-white p-1.5 text-xs shadow shadow-gray-200">
          {results.length > 0 ? (
            results.map((route) => (
              <button
                key={route.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(route.path)}
                className="w-full rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-pink-50 focus-visible:bg-pink-50"
              >
                <div className="flex items-center gap-2 text-[0.75rem] font-semibold">
                  <span>{route.label}</span>
                  <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider text-pink-500 uppercase">
                    {route.badge ?? route.category}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-[0.7rem] text-gray-400">沒有符合的結果</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
