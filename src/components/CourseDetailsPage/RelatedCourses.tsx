import React from 'react';
import Link from 'next/link';
import CourseCard from '@/components/shared/CourseCard';

export const RelatedCourses = ({ course }: { course: any }) => {
  return (
    <div className="py-16 border-t border-secondary-lighter dark:border-secondary mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-secondary dark:text-surface">
          You Might Also Like
        </h2>
        <Link href="/courses" className="text-primary font-semibold hover:text-primary-hover transition-colors flex items-center gap-1">
          View All <span className="text-lg">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Render 4 mock related courses using CourseCard. Assuming CourseCard takes 'course' prop */}
        <CourseCard course={{...course, title: "Related Course 1", _id: "r1", id: "r1"}} />
        <CourseCard course={{...course, title: "Related Course 2", _id: "r2", id: "r2"}} />
        <CourseCard course={{...course, title: "Related Course 3", _id: "r3", id: "r3"}} />
        <CourseCard course={{...course, title: "Related Course 4", _id: "r4", id: "r4"}} />
      </div>
    </div>
  );
};
