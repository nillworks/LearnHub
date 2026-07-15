import { X } from 'lucide-react';
import FilterContent from './FilterContent';
import type { FilterState } from './courses-types';

interface MobileFilterPanelProps {
  filterState: FilterState;
  onClose: () => void;
  onCategoryChange: (cat: string) => void;
  onLevelChange: (lvl: string) => void;
  onDurationChange: (dur: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onPriceBlur: () => void;
  onRatingChange: (val: number) => void;
  onClearAll: () => void;
}

const MobileFilterPanel = ({
  onClose,
  ...filterProps
}: MobileFilterPanelProps) => {
  return (
    <div className="sm:hidden fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative h-full w-80 max-w-full bg-white dark:bg-[#1e293b] shadow-2xl overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-secondary dark:text-surface text-lg">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
        <FilterContent {...filterProps} layout="col" />
      </div>
    </div>
  );
};

export default MobileFilterPanel;
