import React from 'react';
import Link from 'next/link';

export const CourseMobileBottomBar = ({
  course,
  isEnrolled = false,
}: {
  course: any;
  isEnrolled?: boolean;
}) => {
  const discountPercent = course.price
    ? Math.round(((course.price - (course.discountPrice || 0)) / course.price) * 100)
    : 0;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-border dark:border-secondary p-4 flex items-center justify-between z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      {isEnrolled ? (
        <>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-bold text-green-600 dark:text-green-400">
              Enrolled
            </span>
            <span className="text-xs text-text-secondary">
              Continue learning
            </span>
          </div>
          <Link
            href="/dashboard/student"
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm rounded-xl px-8 py-3 transition-colors duration-200"
          >
            Continue Course
          </Link>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex items-end gap-2">
              <span className="text-xl font-heading font-bold text-secondary dark:text-surface">
                ${course.discountPrice || 0}
              </span>
              <span className="text-text-secondary text-sm line-through mb-0.5">
                ${course.price || 0}
              </span>
            </div>
            <span className="text-primary font-medium text-xs">
              {discountPercent}% OFF
            </span>
          </div>
          <button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-sm rounded-xl px-8 py-3 transition-colors duration-200">
            Enroll Now
          </button>
        </>
      )}
    </div>
  );
};
