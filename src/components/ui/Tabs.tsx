import { cn } from '@/utils/cn';

export type TabDefinition = {
  id: string;
  label: string;
};

interface TabsProps {
  mode?: 'label' | 'numeric';
  tabs: TabDefinition[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ mode = 'label', tabs, activeId, onChange, className }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    if (id !== activeId) onChange(id);
  };

  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          onClick={(e) => handleClick(e, tab.id)}
          className={cn(
            'relative border text-sm font-medium tracking-wider transition duration-300',
            mode === 'numeric' ? 'size-6 rounded-full' : 'px-5 py-2',
            tab.id === activeId
              ? 'border-pink-600 bg-pink-600 font-medium text-white shadow shadow-pink-200'
              : 'border-pink-400 bg-white text-pink-600 hover:border-pink-600 hover:bg-pink-50',
          )}
        >
          {mode === 'numeric' ? `${index + 1}` : tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
