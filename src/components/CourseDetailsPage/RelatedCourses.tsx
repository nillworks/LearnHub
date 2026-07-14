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
        {/* Render 4 mock related courses using CourseCard with flattened props */}
        {[1, 2, 3, 4].map((i) => (
          <CourseCard
            key={`r${i}`}
            id={`r${i}`}
            title={`Related Course ${i}`}
            thumbnail={course?.thumbnailUrl || 'https://placehold.co/600x400?text=Course'}
            category={course?.category || 'General'}
            difficulty={course?.difficulty || 'Beginner'}
            instructorName={course?.instructorName || 'Instructor'}
            instructorAvatar={course?.image || `https://i.pravatar.cc/150?u=r${i}`}
            price={course?.price || 49.99}
            discountPrice={course?.discountPrice}
            isFree={course?.isFree}
            studentsEnrolled={course?.studentEnroll ?? 0}
            estimatedDuration={course?.estimatedDuration || '10 hours'}
            lessons={course?.lessons ?? 0}
            avgRating={course?.rating ?? 0}
          />
        ))}
      </div>
    </div>
  );
};
