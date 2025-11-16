import { useLocation } from 'react-router';
import { routeMeta } from '@/routes/meta';
import { usePageIntroTabs } from '@/contexts/PageIntroTabsContext';

const PageIntro: React.FC = () => {
  const { pathname } = useLocation();
  const meta = routeMeta.find((r) => r.path === pathname);
  const { tabsElement } = usePageIntroTabs();

  const eyebrow = meta?.badge ?? meta?.category;
  const title = meta?.label;
  const description = meta?.description;

  if (!title) return null;

  return (
    <section className="mb-6">
      {(eyebrow || tabsElement) && (
        <div className="flex-between-center flex-wrap gap-4">
          {eyebrow && <p className="text-sm font-medium tracking-wider text-pink-700">{eyebrow}</p>}
          {tabsElement && tabsElement}
        </div>
      )}
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="text-base/7 text-gray-600">{description}</p>
    </section>
  );
};

export default PageIntro;
