import React from 'react';
import getAllCourse from '@/lib/api/getAllCourse';
import AllCoursesPage from '@/components/AllCoursesPage/AllCoursesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Courses | LearnHub',
  description:
    'Browse all published courses on LearnHub. Search by course name or instructor, filter by category, price, rating, duration, and level.',
};

const CoursesPage = async () => {
  const courses = await getAllCourse();

  return <AllCoursesPage courses={courses} />;
};

export default CoursesPage;
