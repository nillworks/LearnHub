import React from 'react';

export const CourseMobileBottomBar = ({ course }: { course: any }) => {
  const price = course.price || 42;
  const discountPrice = course.discountPrice || 2;
  const discountPercent = Math.round(((price - discountPrice) / price) * 100);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-border dark:border-secondary p-4 flex items-center justify-between z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col">
        <div className="flex items-end gap-2">
          <span className="text-xl font-heading font-bold text-secondary dark:text-surface">
            ${discountPrice}
          </span>
          <span className="text-text-secondary text-sm line-through mb-0.5">
            ${price}
          </span>
        </div>
        <span className="text-primary font-medium text-xs">
          {discountPercent}% OFF
        </span>
      </div>
      <button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-sm rounded-xl px-8 py-3 transition-colors duration-200">
        Enroll Now
      </button>
    </div>
  );
};
