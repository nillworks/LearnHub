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

const CoursesPage = async () => {
  const response = await getAllCourse({ page: 1, limit: 10 });
  const courses = response?.data || [];
  const pagination = response?.pagination || { hasMore: false };

  return <AllCoursesPage initialCourses={courses} initialPagination={pagination} />;
};

export default CoursesPage;
