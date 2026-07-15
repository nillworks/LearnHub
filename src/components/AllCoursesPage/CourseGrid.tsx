import { BookOpen } from 'lucide-react';
import CourseCard from '@/components/shared/CourseCard';
import type { Course } from './courses-types';

const CourseSkeleton = () => (
  <div className="flex flex-col bg-white dark:bg-[#1e293b] rounded-3xl border border-secondary-lighter dark:border-secondary overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-secondary-lighter dark:bg-secondary w-full" />
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-secondary-lighter dark:bg-secondary rounded-full w-24" />
        <div className="h-4 bg-secondary-lighter dark:bg-secondary rounded-full w-12" />
      </div>
      <div className="h-6 bg-secondary-lighter dark:bg-secondary rounded-full w-3/4 mb-4" />
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-secondary-lighter dark:bg-secondary" />
        <div className="h-3 bg-secondary-lighter dark:bg-secondary rounded-full w-24" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-3 bg-secondary-lighter dark:bg-secondary rounded-full w-16" />
        <div className="h-3 bg-secondary-lighter dark:bg-secondary rounded-full w-16" />
      </div>
      <div className="border-t border-border dark:border-secondary mt-auto pt-4 flex justify-between items-center">
        <div className="h-6 bg-secondary-lighter dark:bg-secondary rounded-full w-16" />
        <div className="h-10 bg-secondary-lighter dark:bg-secondary rounded-xl w-28" />
      </div>
    </div>
  </div>
);

interface CourseGridProps {
  courses: Course[];
  isFetching: boolean;
  showFilters: boolean;
  onClearFilters: () => void;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

const CourseGrid = ({
  courses,
  isFetching,
  showFilters,
  onClearFilters,
  observerRef,
}: CourseGridProps) => {
  if (courses.length === 0 && !isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-5">
          <BookOpen className="size-9 text-primary" />
        </div>
        <h3 className="font-heading font-bold text-secondary dark:text-surface text-xl mb-2">
          No courses found
        </h3>
        <p className="text-text-secondary text-sm max-w-xs">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-5 bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`grid gap-6 ${
          showFilters
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
        }`}
      >
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}

        {isFetching &&
          Array.from({ length: 3 }).map((_, i) => (
            <CourseSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      <div
        ref={observerRef}
        className="h-10 w-full flex items-center justify-center"
      >
        {isFetching && (
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseGrid;
