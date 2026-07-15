import { CATEGORIES, LEVELS, DURATIONS, type FilterState } from './courses-types';

interface FilterContentProps {
  filterState: FilterState;
  onCategoryChange: (cat: string) => void;
  onLevelChange: (lvl: string) => void;
  onDurationChange: (dur: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onPriceBlur: () => void;
  onRatingChange: (val: number) => void;
  onClearAll: () => void;
  layout?: 'row' | 'col';
}

const FilterContent = ({
  filterState,
  onCategoryChange,
  onLevelChange,
  onDurationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPriceBlur,
  onRatingChange,
  onClearAll,
  layout = 'row',
}: FilterContentProps) => {
  const isRow = layout === 'row';

  return (
    <div className={isRow ? 'flex flex-wrap items-center gap-4' : 'space-y-7'}>
      {/* Category */}
      <div className={isRow ? 'flex items-center gap-2' : ''}>
        {isRow && (
          <span className="font-heading font-bold text-secondary dark:text-surface text-xs uppercase tracking-wide whitespace-nowrap">
            Category
          </span>
        )}
        {!isRow && (
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
            Category
          </h3>
        )}
        <div className={isRow ? 'flex flex-wrap gap-1.5' : 'flex flex-col gap-1.5'}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`${
                isRow ? 'text-xs px-3 py-1.5 rounded-full border' : 'text-left text-sm px-3 py-2 rounded-xl'
              } font-medium transition-all ${
                filterState.selectedCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : isRow
                    ? 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'
                    : 'text-text-secondary hover:bg-primary-light hover:text-primary-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isRow && <div className="w-px h-6 bg-secondary-lighter dark:bg-secondary hidden xl:block" />}

      {/* Level */}
      <div className={isRow ? 'flex items-center gap-2' : ''}>
        {isRow && (
          <span className="font-heading font-bold text-secondary dark:text-surface text-xs uppercase tracking-wide whitespace-nowrap">
            Level
          </span>
        )}
        {!isRow && (
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
            Level
          </h3>
        )}
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => onLevelChange(lvl)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filterState.selectedLevel === lvl
                  ? 'bg-primary text-white border-primary'
                  : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {isRow && <div className="w-px h-6 bg-secondary-lighter dark:bg-secondary hidden xl:block" />}

      {/* Duration */}
      <div className={isRow ? 'flex items-center gap-2' : ''}>
        {isRow && (
          <span className="font-heading font-bold text-secondary dark:text-surface text-xs uppercase tracking-wide whitespace-nowrap">
            Duration
          </span>
        )}
        {!isRow && (
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
            Duration
          </h3>
        )}
        <div className={isRow ? 'flex flex-wrap gap-1.5' : 'flex flex-col gap-1.5'}>
          {DURATIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => onDurationChange(d.value)}
              className={`${
                isRow ? 'text-xs px-3 py-1.5 rounded-full border' : 'text-left text-sm px-3 py-2 rounded-xl'
              } font-medium transition-all ${
                filterState.selectedDuration === d.value
                  ? 'bg-primary text-white border-primary'
                  : isRow
                    ? 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'
                    : 'text-text-secondary hover:bg-primary-light hover:text-primary-dark'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {isRow && <div className="w-px h-6 bg-secondary-lighter dark:bg-secondary hidden xl:block" />}

      {/* Price Range */}
      <div className={isRow ? 'flex items-center gap-2' : ''}>
        {isRow && (
          <span className="font-heading font-bold text-secondary dark:text-surface text-xs uppercase tracking-wide whitespace-nowrap">
            Price
          </span>
        )}
        {!isRow && (
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
            Price Range ($)
          </h3>
        )}
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            placeholder="Min"
            value={filterState.minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            onBlur={onPriceBlur}
            min={0}
            className={`${isRow ? 'w-20 text-xs' : 'w-full text-sm'} rounded-xl border border-secondary-lighter dark:border-secondary bg-surface dark:bg-[#0f172a] px-2.5 py-1.5 text-text-primary dark:text-surface outline-none focus:ring-2 focus:ring-primary/30`}
          />
          <span className="text-text-secondary text-xs">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filterState.maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            onBlur={onPriceBlur}
            min={0}
            className={`${isRow ? 'w-20 text-xs' : 'w-full text-sm'} rounded-xl border border-secondary-lighter dark:border-secondary bg-surface dark:bg-[#0f172a] px-2.5 py-1.5 text-text-primary dark:text-surface outline-none focus:ring-2 focus:ring-primary/30`}
          />
        </div>
      </div>

      {isRow && <div className="w-px h-6 bg-secondary-lighter dark:bg-secondary hidden xl:block" />}

      {/* Minimum Rating */}
      <div className={isRow ? 'flex items-center gap-2' : ''}>
        {isRow && (
          <span className="font-heading font-bold text-secondary dark:text-surface text-xs uppercase tracking-wide whitespace-nowrap">
            Rating
          </span>
        )}
        {!isRow && (
          <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
            Minimum Rating
          </h3>
        )}
        <div className="flex gap-1.5 flex-wrap">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filterState.minRating === r
                  ? 'bg-primary text-white border-primary'
                  : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {r === 0 ? 'Any' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {filterState.hasActiveFilters && (
        <>
          {isRow && <div className="w-px h-6 bg-secondary-lighter dark:bg-secondary hidden xl:block" />}
          <button
            onClick={onClearAll}
            className={`${isRow ? 'text-xs rounded-full px-3 py-1.5' : 'w-full text-sm rounded-xl py-2'} text-red-500 hover:text-red-600 font-semibold border border-red-200 dark:border-red-900/40 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10`}
          >
            {isRow ? 'Clear All' : 'Clear All Filters'}
          </button>
        </>
      )}
    </div>
  );
};

export default FilterContent;
