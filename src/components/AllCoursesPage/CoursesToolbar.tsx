import { SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import { SORT_OPTIONS } from './courses-types';

interface CoursesToolbarProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const CoursesToolbar = ({
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  sortBy,
  onSortChange,
}: CoursesToolbarProps) => {
  return (
    <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-secondary-lighter dark:border-secondary shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleFilters}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border transition-all duration-200 ${
                showFilters
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-[#1e293b] border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface hover:border-primary'
              }`}
            >
              <SlidersHorizontal className="size-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-white text-primary text-[10px] font-bold">
                  !
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                <X className="size-3.5" />
                Clear All
              </button>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 rounded-xl border border-secondary-lighter dark:border-secondary bg-white dark:bg-[#1e293b] px-4 py-2">
              <Filter className="size-3.5 text-text-secondary" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="text-sm text-text-primary dark:text-surface bg-transparent outline-none cursor-pointer pr-1"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-3.5 text-text-secondary pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesToolbar;
