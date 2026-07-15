import React from 'react';
import getAllCourse from '@/lib/api/getAllCourse';
import AllCoursesPage from '@/components/AllCoursesPage/AllCoursesPage';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Courses | LearnHub',
  description:
    'Browse all published courses on LearnHub. Search by course name or instructor, filter by category, price, rating, duration, and level.',
};

type SearchParams = {
  q?: string;
  category?: string;
  level?: string;
  duration?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortBy?: string;
  page?: string;
};

const CoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const sp = await searchParams;

  const apiParams: Record<string, any> = {
    page: sp.page || '1',
    limit: '12',
  };

  if (sp.q) apiParams.search = sp.q;
  if (sp.category) apiParams.category = sp.category;
  if (sp.level) apiParams.level = sp.level;
  if (sp.duration) apiParams.duration = sp.duration;
  if (sp.minPrice) apiParams.minPrice = sp.minPrice;
  if (sp.maxPrice) apiParams.maxPrice = sp.maxPrice;
  if (sp.minRating) apiParams.minRating = sp.minRating;
  if (sp.sortBy) apiParams.sortBy = sp.sortBy;

  const response = await getAllCourse(apiParams);
  const courses = response?.data || [];
  const pagination = response?.pagination || { hasMore: false };

  const initialFilters = {
    q: sp.q || '',
    category: sp.category || 'All',
    level: sp.level || 'All',
    duration: sp.duration || 'all',
    minPrice: sp.minPrice || '',
    maxPrice: sp.maxPrice || '',
    minRating: sp.minRating || '0',
    sortBy: sp.sortBy || 'latest',
  };

  return (
    <AllCoursesPage
      initialCourses={courses}
      initialPagination={pagination}
      initialFilters={initialFilters}
    />
  );
};

export default CoursesPage;
