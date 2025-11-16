import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type PageIntroTabsContextValue = {
  tabsElement: ReactNode | null;
  setTabsElement: Dispatch<SetStateAction<ReactNode | null>>;
};

const PageIntroTabsContext = createContext<PageIntroTabsContextValue | undefined>(undefined);

export const PageIntroTabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabsElement, setTabsElement] = useState<ReactNode | null>(null);
  const value = useMemo(() => ({ tabsElement, setTabsElement }), [tabsElement]);

  return <PageIntroTabsContext.Provider value={value}>{children}</PageIntroTabsContext.Provider>;
};

export const usePageIntroTabs = () => {
  const context = useContext(PageIntroTabsContext);
  if (!context) throw new Error('usePageIntroTabs 必須在 PageIntroTabsProvider 內使用！');
  return context;
};
