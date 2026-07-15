import { Search, X, BookOpen } from 'lucide-react';

interface CoursesHeroBannerProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const CoursesHeroBanner = ({ search, onSearchChange }: CoursesHeroBannerProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-secondary py-16 md:py-24">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-4">
          <BookOpen className="size-4" />
          <span>Explore our curriculum</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
          Explore All Courses
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
          Find the perfect course to level up your skills. Search, filter, and
          discover your next learning journey.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-secondary pointer-events-none" />
          <input
            type="text"
            placeholder="Search by course name or instructor..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm bg-white dark:bg-[#1e293b] text-text-primary dark:text-surface placeholder:text-text-secondary border border-transparent focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesHeroBanner;
