import { useMemo } from 'react';
import { NavLink } from 'react-router';
import { categoryConfig, navItems, type RouteMeta, type SidebarCategory } from '@/routes/meta';
import { cn } from '@/utils/cn';
import XMarkIcon from '@/assets/icons/xmark.svg?react';
import RedoIcon from '@/assets/icons/redo.svg?react';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const sidebarNavItems = useMemo(
    () => navItems.filter((item) => item.category !== 'home' && item.showInNav),
    [],
  );

  const groupedItems = useMemo(
    () =>
      sidebarNavItems.reduce<Partial<Record<SidebarCategory, RouteMeta[]>>>((acc, item) => {
        const category = item.category as SidebarCategory;
        if (!acc[category]) acc[category] = [];
        acc[category]!.push(item);
        return acc;
      }, {}),
    [sidebarNavItems],
  );

  const sortedCategories = useMemo(
    () =>
      categoryConfig.filter((c) => groupedItems[c.id]?.length).sort((a, b) => a.order - b.order),
    [groupedItems],
  );

  return (
    <div className="relative flex min-h-screen w-0 shrink-0 md:w-60">
      <div
        className={cn(
          'fixed inset-0 z-10 bg-black/40 backdrop-blur transition-opacity duration-200 md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 flex w-60 flex-col gap-y-8 bg-white px-6 py-6 transition-transform duration-200 ease-out max-md:z-999 md:fixed md:inset-y-0 md:left-0 md:h-screen md:bg-transparent',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm font-medium tracking-[0.25em]"
            onClick={() => setIsOpen(false)}
          >
            <img src="/favicon.ico" alt="kir4che's logo" className="inline-block size-5" />
            前端培養皿
          </NavLink>
          <button
            className="ml-auto md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="關閉側欄"
          >
            <XMarkIcon className="size-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-6 overflow-y-auto">
          {sortedCategories.map((category) => {
            const items = groupedItems[category.id];
            if (!items || items.length === 0) return null;

            return (
              <div key={category.id} className="space-y-3">
                <p className="text-[0.7rem] font-semibold tracking-[0.25em] text-gray-400 uppercase">
                  {category.name}
                </p>
                <div className="flex flex-col">
                  {items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'pl-2 text-sm transition-colors duration-200',
                          isActive
                            ? 'border-l-2 border-pink-600 font-semibold text-pink-600'
                            : 'border-l border-gray-300 hover:text-pink-500 focus-visible:text-pink-500',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <a
          href="https://kir4che.com"
          target="_self"
          onClick={() => setIsOpen(false)}
          className="group relative mt-auto inline-flex items-center justify-center gap-2 overflow-hidden border border-pink-600 px-6 py-2 text-xs font-medium text-pink-600 transition-all duration-300 ease-in-out hover:text-white active:top-0.5"
        >
          <span className="absolute inset-0 -z-1 h-full w-0 bg-pink-600 transition-all duration-300 ease-in-out group-hover:right-0 group-hover:left-auto group-hover:w-full" />
          <RedoIcon className="size-4" />
          返回部落格
        </a>
      </aside>
    </div>
  );
};

export default SideBar;
