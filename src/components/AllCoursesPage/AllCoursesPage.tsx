'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import getAllCourse from '@/lib/api/getAllCourse';
import CoursesHeroBanner from './CoursesHeroBanner';
import CoursesToolbar from './CoursesToolbar';
import DesktopFilterSidebar from './DesktopFilterSidebar';
import MobileFilterPanel from './MobileFilterPanel';
import CourseGrid from './CourseGrid';
import type { Course, InitialFilters } from './courses-types';

export default function AllCoursesPage({
  initialCourses,
  initialPagination,
  initialFilters,
}: {
  initialCourses: Course[];
  initialPagination: any;
  initialFilters: InitialFilters;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [page, setPage] = useState(initialPagination?.page || 1);
  const [hasMore, setHasMore] = useState(initialPagination?.hasMore || false);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const [search, setSearch] = useState(initialFilters.q);
  const [debouncedSearch, setDebouncedSearch] = useState(initialFilters.q);
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);
  const [selectedLevel, setSelectedLevel] = useState(initialFilters.level);
  const [selectedDuration, setSelectedDuration] = useState(initialFilters.duration);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [minRating, setMinRating] = useState(Number(initialFilters.minRating) || 0);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);
  const [showFilters, setShowFilters] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const pushURL = useCallback(
    (params: Record<string, string>) => {
      const cleaned: Record<string, string> = {};
      Object.entries(params).forEach(([k, v]) => {
        if (v && v !== '' && v !== 'All' && v !== 'all' && v !== '0' && v !== 'latest') {
          cleaned[k] = v;
        }
      });
      const qs = new URLSearchParams(cleaned).toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname],
  );

  const updateSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setSelectedCategory('All');
      setSelectedLevel('All');
      setSelectedDuration('all');
      setMinPrice('');
      setMaxPrice('');
      setMinRating(0);
      setSortBy('latest');

      const cleaned: Record<string, string> = {};
      if (value) cleaned.q = value;
      const qs = new URLSearchParams(cleaned).toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname],
  );

  const updateFilter = useCallback(
    (key: string, value: string) => {
      setSearch('');
      setDebouncedSearch('');

      const current: Record<string, string> = {};
      if (key !== 'category') {
        if (selectedCategory !== 'All') current.category = selectedCategory;
      } else {
        if (value !== 'All') current.category = value;
      }
      if (key !== 'level') {
        if (selectedLevel !== 'All') current.level = selectedLevel;
      } else {
        if (value !== 'All') current.level = value;
      }
      if (key !== 'duration') {
        if (selectedDuration !== 'all') current.duration = selectedDuration;
      } else {
        if (value !== 'all') current.duration = value;
      }
      if (key !== 'sortBy') {
        if (sortBy !== 'latest') current.sortBy = sortBy;
      } else {
        if (value !== 'latest') current.sortBy = value;
      }

      const qs = new URLSearchParams(current).toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, selectedCategory, selectedLevel, selectedDuration, sortBy],
  );

  const updatePriceFilter = useCallback(
    (min: string, max: string) => {
      setSearch('');
      setDebouncedSearch('');

      const current: Record<string, string> = {};
      if (selectedCategory !== 'All') current.category = selectedCategory;
      if (selectedLevel !== 'All') current.level = selectedLevel;
      if (selectedDuration !== 'all') current.duration = selectedDuration;
      if (sortBy !== 'latest') current.sortBy = sortBy;
      if (min) current.minPrice = min;
      if (max) current.maxPrice = max;

      const qs = new URLSearchParams(current).toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, selectedCategory, selectedLevel, selectedDuration, sortBy],
  );

  const updateRatingFilter = useCallback(
    (value: number) => {
      setSearch('');
      setDebouncedSearch('');

      const current: Record<string, string> = {};
      if (selectedCategory !== 'All') current.category = selectedCategory;
      if (selectedLevel !== 'All') current.level = selectedLevel;
      if (selectedDuration !== 'all') current.duration = selectedDuration;
      if (sortBy !== 'latest') current.sortBy = sortBy;
      if (value > 0) current.minRating = String(value);

      const qs = new URLSearchParams(current).toString();
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, selectedCategory, selectedLevel, selectedDuration, sortBy],
  );

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let isMounted = true;
    const fetchFiltered = async () => {
      if (isInitial) {
        setIsInitial(false);
        return;
      }
      setIsFetching(true);
      const res = await getAllCourse({
        page: 1,
        limit: 12,
        search: debouncedSearch,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        level: selectedLevel !== 'All' ? selectedLevel : undefined,
        duration: selectedDuration !== 'all' ? selectedDuration : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        minRating: minRating || undefined,
        sortBy,
      });
      if (isMounted) {
        setCourses(res?.data || []);
        setPage(res?.pagination?.page || 1);
        setHasMore(res?.pagination?.hasMore || false);
        setIsFetching(false);
      }
    };
    fetchFiltered();
    return () => { isMounted = false; };
  }, [debouncedSearch, selectedCategory, selectedLevel, selectedDuration, minPrice, maxPrice, minRating, sortBy, isInitial]);

  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    const nextPage = page + 1;
    const res = await getAllCourse({
      page: nextPage,
      limit: 12,
      search: debouncedSearch,
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      level: selectedLevel !== 'All' ? selectedLevel : undefined,
      duration: selectedDuration !== 'all' ? selectedDuration : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      minRating: minRating || undefined,
      sortBy,
    });
    if (res?.data) {
      setCourses((prev) => [...prev, ...res.data]);
      setPage(res.pagination.page);
      setHasMore(res.pagination.hasMore);
    }
    setIsFetching(false);
  }, [page, hasMore, isFetching, debouncedSearch, selectedCategory, selectedLevel, selectedDuration, minPrice, maxPrice, minRating, sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 1.0 },
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
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
    setDebouncedSearch('');
    setSortBy('latest');
    router.push(pathname, { scroll: false });
  };

  const filterState = {
    search,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    hasActiveFilters,
  };

  const filterHandlers = {
    onCategoryChange: (cat: string) => { setSelectedCategory(cat); updateFilter('category', cat); },
    onLevelChange: (lvl: string) => { setSelectedLevel(lvl); updateFilter('level', lvl); },
    onDurationChange: (dur: string) => { setSelectedDuration(dur); updateFilter('duration', dur); },
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,
    onPriceBlur: () => updatePriceFilter(minPrice, maxPrice),
    onRatingChange: (val: number) => { setMinRating(val); updateRatingFilter(val); },
    onClearAll: clearFilters,
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#0f172a]">
      <CoursesHeroBanner search={search} onSearchChange={updateSearch} />

      <CoursesToolbar
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((p) => !p)}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        onSortChange={(val) => { setSortBy(val); updateFilter('sortBy', val); }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {showFilters && (
          <DesktopFilterSidebar variant="top" filterState={filterState} {...filterHandlers} />
        )}

        {showFilters && (
          <MobileFilterPanel
            filterState={filterState}
            onClose={() => setShowFilters(false)}
            {...filterHandlers}
          />
        )}

        <div className="flex gap-8 mt-6">
          {showFilters && (
            <DesktopFilterSidebar variant="sidebar" filterState={filterState} {...filterHandlers} />
          )}

          <div className="flex-1 min-w-0">
            <CourseGrid
              courses={courses}
              isFetching={isFetching}
              showFilters={showFilters}
              onClearFilters={clearFilters}
              observerRef={observerTarget}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
