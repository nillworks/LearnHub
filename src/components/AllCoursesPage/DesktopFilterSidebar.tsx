import FilterContent from './FilterContent';
import type { FilterState } from './courses-types';

interface DesktopFilterSidebarProps {
  filterState: FilterState;
  onCategoryChange: (cat: string) => void;
  onLevelChange: (lvl: string) => void;
  onDurationChange: (dur: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onPriceBlur: () => void;
  onRatingChange: (val: number) => void;
  onClearAll: () => void;
  variant?: 'top' | 'sidebar';
}

const DesktopFilterSidebar = ({
  variant = 'top',
  ...props
}: DesktopFilterSidebarProps) => {
  if (variant === 'top') {
    return (
      <div className="hidden md:block w-full">
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-secondary-lighter dark:border-secondary shadow-sm p-5">
          <FilterContent {...props} layout="row" />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:hidden w-72 shrink-0">
      <div className="sticky top-24 bg-white dark:bg-[#1e293b] rounded-3xl border border-secondary-lighter dark:border-secondary shadow-sm p-6">
        <FilterContent {...props} layout="col" />
      </div>
    </div>
  );
};

export default DesktopFilterSidebar;
