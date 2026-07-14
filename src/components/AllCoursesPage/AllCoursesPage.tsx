'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CourseCard from '@/components/shared/CourseCard';
import getAllCourse from '@/lib/api/getAllCourse';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  BookOpen,
  Filter,
} from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  thumbnailUrl?: string;
  category?: string;
  difficulty?: string;
  instructorName?: string;
  image?: string;
  price?: number;
  discountPrice?: number;
  isFree?: boolean;
  studentEnroll?: number;
  estimatedDuration?: string;
  lessons?: number;
  rating?: number;
  createdAt?: string;
}

const CATEGORIES = [
  'All',
  'Development',
  'Design',
  'Marketing',
  'Business',
  'Photography',
  'Music',
  'Health',
  'Finance',
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const DURATIONS = [
  { label: 'All', value: 'all' },
  { label: 'Under 2 Hours', value: 'under2' },
  { label: '2–5 Hours', value: '2to5' },
  { label: '5–10 Hours', value: '5to10' },
  { label: '10+ Hours', value: 'over10' },
];

const SORT_OPTIONS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Lowest Price', value: 'price_asc' },
  { label: 'Highest Price', value: 'price_desc' },
];

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

export default function AllCoursesPage({ 
  initialCourses, 
  initialPagination 
}: { 
  initialCourses: Course[], 
  initialPagination: any 
}) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [page, setPage] = useState(initialPagination?.page || 1);
  const [hasMore, setHasMore] = useState(initialPagination?.hasMore || false);
  const [isFetching, setIsFetching] = useState(false);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch when filters change (Reset page to 1)
  useEffect(() => {
    let isMounted = true;
    const fetchFiltered = async () => {
      setIsFetching(true);
      const res = await getAllCourse({
        page: 1,
        limit: 10,
        search: debouncedSearch,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        level: selectedLevel !== 'All' ? selectedLevel : undefined,
        duration: selectedDuration !== 'all' ? selectedDuration : undefined,
        minPrice,
        maxPrice,
        minRating,
        sortBy
      });

      if (isMounted) {
        setCourses(res?.data || []);
        setPage(res?.pagination?.page || 1);
        setHasMore(res?.pagination?.hasMore || false);
        setIsFetching(false);
      }
    };
    
    // Skip initial render fetch since we have initialCourses, 
    // unless a filter was already applied (which shouldn't happen on first load)
    fetchFiltered();

    return () => { isMounted = false; };
  }, [debouncedSearch, selectedCategory, selectedLevel, selectedDuration, minPrice, maxPrice, minRating, sortBy]);

  // Fetch more pages on scroll
  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    
    const nextPage = page + 1;
    const res = await getAllCourse({
      page: nextPage,
      limit: 10,
      search: debouncedSearch,
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      level: selectedLevel !== 'All' ? selectedLevel : undefined,
      duration: selectedDuration !== 'all' ? selectedDuration : undefined,
      minPrice,
      maxPrice,
      minRating,
      sortBy
    });

    if (res?.data) {
      setCourses(prev => [...prev, ...res.data]);
      setPage(res.pagination.page);
      setHasMore(res.pagination.hasMore);
    }
    setIsFetching(false);
  }, [page, hasMore, isFetching, debouncedSearch, selectedCategory, selectedLevel, selectedDuration, minPrice, maxPrice, minRating, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [loadMore]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    selectedDuration !== 'all' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    minRating > 0;

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedDuration('all');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setSearch('');
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#0f172a]">
      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-secondary py-16 md:py-24">
        {/* decorative blobs */}
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

          {/* ── SEARCH BAR ── */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-secondary pointer-events-none" />
            <input
              type="text"
              placeholder="Search by course name or instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm bg-white dark:bg-[#1e293b] text-text-primary dark:text-surface placeholder:text-text-secondary border border-transparent focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-secondary-lighter dark:border-secondary shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Left: results count + filter toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters((p) => !p)}
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
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <X className="size-3.5" />
                  Clear All
                </button>
              )}
            </div>

            {/* Right: Sort dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2 rounded-xl border border-secondary-lighter dark:border-secondary bg-white dark:bg-[#1e293b] px-4 py-2">
                <Filter className="size-3.5 text-text-secondary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* ── FILTER SIDEBAR ── */}
          {showFilters && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-white dark:bg-[#1e293b] rounded-3xl border border-secondary-lighter dark:border-secondary shadow-sm p-6 space-y-7">
                {/* Category */}
                <div>
                  <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
                    Category
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-all ${
                          selectedCategory === cat
                            ? 'bg-primary text-white font-semibold'
                            : 'text-text-secondary hover:bg-primary-light hover:text-primary-dark'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
                    Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                          selectedLevel === lvl
                            ? 'bg-primary text-white border-primary'
                            : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
                    Duration
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {DURATIONS.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDuration(d.value)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-all ${
                          selectedDuration === d.value
                            ? 'bg-primary text-white font-semibold'
                            : 'text-text-secondary hover:bg-primary-light hover:text-primary-dark'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
                    Price Range ($)
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min={0}
                      className="w-full rounded-xl border border-secondary-lighter dark:border-secondary bg-surface dark:bg-[#0f172a] px-3 py-2 text-sm text-text-primary dark:text-surface outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <span className="text-text-secondary text-sm">–</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min={0}
                      className="w-full rounded-xl border border-secondary-lighter dark:border-secondary bg-surface dark:bg-[#0f172a] px-3 py-2 text-sm text-text-primary dark:text-surface outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <h3 className="font-heading font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">
                    Minimum Rating
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 3, 3.5, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                          minRating === r
                            ? 'bg-primary text-white border-primary'
                            : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'
                        }`}
                      >
                        {r === 0 ? 'Any' : `${r}★+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear button */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full text-sm text-red-500 hover:text-red-600 font-semibold border border-red-200 dark:border-red-900/40 rounded-xl py-2 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>
          )}

          {/* ── MOBILE FILTER PANEL ── */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="relative ml-auto h-full w-80 max-w-full bg-white dark:bg-[#1e293b] shadow-2xl overflow-y-auto p-6 space-y-7">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-heading font-bold text-secondary dark:text-surface text-lg">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {/* Category */}
                <div>
                  <h3 className="font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">Category</h3>
                  <div className="flex flex-col gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-all ${selectedCategory === cat ? 'bg-primary text-white font-semibold' : 'text-text-secondary hover:bg-primary-light hover:text-primary-dark'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <h3 className="font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map((lvl) => (
                      <button key={lvl} onClick={() => setSelectedLevel(lvl)}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${selectedLevel === lvl ? 'bg-primary text-white border-primary' : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'}`}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">Duration</h3>
                  <div className="flex flex-col gap-1.5">
                    {DURATIONS.map((d) => (
                      <button key={d.value} onClick={() => setSelectedDuration(d.value)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-all ${selectedDuration === d.value ? 'bg-primary text-white font-semibold' : 'text-text-secondary hover:bg-primary-light hover:text-primary-dark'}`}>
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">Price Range ($)</h3>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} min={0}
                      className="w-full rounded-xl border border-secondary-lighter dark:border-secondary bg-surface dark:bg-[#0f172a] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    <span className="text-text-secondary text-sm">–</span>
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} min={0}
                      className="w-full rounded-xl border border-secondary-lighter dark:border-secondary bg-surface dark:bg-[#0f172a] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-bold text-secondary dark:text-surface text-sm mb-3 uppercase tracking-wide">Minimum Rating</h3>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 3, 3.5, 4, 4.5].map((r) => (
                      <button key={r} onClick={() => setMinRating(r)}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${minRating === r ? 'bg-primary text-white border-primary' : 'border-secondary-lighter dark:border-secondary text-text-secondary hover:border-primary hover:text-primary'}`}>
                        {r === 0 ? 'Any' : `${r}★+`}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => { clearFilters(); setShowFilters(false); }}
                  className="w-full text-sm text-red-500 font-semibold border border-red-200 rounded-xl py-2 transition-colors hover:bg-red-50">
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* ── COURSE GRID ── */}
          <div className="flex-1 min-w-0">
            {courses.length === 0 && !isFetching ? (
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
                  onClick={clearFilters}
                  className="mt-5 bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div
                  className={`grid gap-6 ${
                    showFilters
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                  }`}
                >
                  {courses.map((course) => (
                    <CourseCard
                      key={course._id}
                      id={course._id}
                      title={course.title || 'Untitled Course'}
                      thumbnail={course.thumbnailUrl || 'https://placehold.co/600x400?text=Course'}
                      category={course.category || 'General'}
                      difficulty={course.difficulty || 'Beginner'}
                      instructorName={course.instructorName || 'Instructor'}
                      instructorAvatar={course.image || `https://i.pravatar.cc/150?u=${course._id}`}
                      price={course.price || 0}
                      discountPrice={course.discountPrice}
                      isFree={course.isFree}
                      studentsEnrolled={course.studentEnroll ?? 0}
                      estimatedDuration={course.estimatedDuration || ''}
                      lessons={course.lessons ?? 0}
                      avgRating={course.rating ?? 0}
                    />
                  ))}
                  
                  {isFetching && Array.from({ length: 3 }).map((_, i) => (
                    <CourseSkeleton key={`skeleton-${i}`} />
                  ))}
                </div>
                
                {/* Intersection Observer Target */}
                <div ref={observerTarget} className="h-10 w-full flex items-center justify-center">
                  {isFetching && (
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
