import { type ReactNode, useEffect, useState } from 'react';

import { usePageIntroTabs } from '@/contexts/PageIntroTabsContext';
import { cn } from '@/utils/cn';
import Tabs, { type TabDefinition } from '@/components/ui/Tabs';

export type SceneTabDefinition<T = unknown> = TabDefinition & T;

type ScenePageLayoutProps<T extends TabDefinition> = {
  tabs: T[];
  children: (activeTab: T) => ReactNode;
  className?: string;
};

const ScenePageLayout = <T extends TabDefinition>({
  tabs,
  children,
  className,
}: ScenePageLayoutProps<T>) => {
  const { setTabsElement } = usePageIntroTabs();
  const [activeTabId, setActiveTabId] = useState<string>(() => tabs[0]?.id ?? '');

  useEffect(() => {
    if (tabs.length && !tabs.some((tab) => tab.id === activeTabId)) setActiveTabId(tabs[0].id);
  }, [activeTabId, tabs]);

  useEffect(() => {
    if (!tabs.length) {
      setTabsElement(null);
      return;
    }

    setTabsElement(
      <Tabs
        mode="numeric"
        tabs={tabs}
        activeId={activeTabId || tabs[0].id}
        onChange={setActiveTabId}
      />,
    );

    return () => {
      setTabsElement(null);
    };
  }, [activeTabId, setTabsElement, tabs]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (!activeTab) return null;

  return <section className={cn('space-y-4', className)}>{children(activeTab)}</section>;
};

export default ScenePageLayout;
