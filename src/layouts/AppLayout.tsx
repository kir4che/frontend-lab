import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { PageIntroTabsProvider } from '@/contexts/PageIntroTabsContext';
import SideBar from '@/components/layout/SideBar';
import Header from '@/components/layout/Header';
import PageIntro from '@/components/shared/PageIntro';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1560px]">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="relative flex-1 overflow-hidden md:border-x md:border-pink-100">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="mx-auto min-h-full bg-pink-50 p-6 pt-20 md:pt-6">
          <PageIntroTabsProvider>
            {location.pathname !== '/' && <PageIntro />}
            <Outlet />
          </PageIntroTabsProvider>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
