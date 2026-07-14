import React from 'react';
import getFetherdLemetedData from '@/lib/api/getFetherdLemetedData';
import CourseCard from '../shared/CourseCard';
import Link from 'next/link';

const FeaturedCourses = async () => {
  const featuredCourses = await getFetherdLemetedData(6);

  return (
    <section className="py-16 md:py-24 bg-surface dark:bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6 lg:max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
              Top Picks For You
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary dark:text-surface mb-4">
              Featured Courses
            </h2>
            <p className="text-text-secondary font-body leading-relaxed text-base md:text-lg">
              Explore our most popular and highly rated courses. Join thousands of students learning new skills today.
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden md:inline-flex bg-white dark:bg-[#1e293b] border border-border dark:border-secondary hover:bg-primary-light hover:border-primary text-text-primary dark:text-surface font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
          >
            Browse All Courses
          </Link>
        </div>

        {featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCourses.map((course: any) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                thumbnail={course.thumbnail}
                category={course.category || 'Development'}
                difficulty={course.difficulty || 'Beginner'}
                price={course.price || 49.99}
                discountPrice={course.discountPrice}
                isFree={course.isFree}
                studentsEnrolled={course.studentsEnrolled || 12430}
                estimatedDuration={course.estimatedDuration || '24 hours'}
                avgRating={course.avgRating || 4.8}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary">
            <p className="text-text-secondary font-body">No featured courses available at the moment.</p>
          </div>
        )}
        
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/courses"
            className="inline-flex w-full justify-center bg-white dark:bg-[#1e293b] border border-border dark:border-secondary hover:bg-primary-light text-text-primary dark:text-surface font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
