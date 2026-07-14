import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export const CourseReviewsTab = ({ course }: { course: any }) => {
  const avgRating = course.avgRating ? course.avgRating.toFixed(1) : "4.8";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-heading font-bold text-secondary dark:text-surface mb-6">
        Student Reviews
      </h2>

      {/* Rating Summary Block */}
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 md:p-8 border border-secondary-lighter dark:border-secondary shadow-sm mb-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex flex-col items-center justify-center md:border-r border-secondary-lighter dark:border-secondary md:pr-8 md:w-1/3">
          <span className="text-6xl font-heading font-bold text-secondary dark:text-surface mb-2">
            {avgRating}
          </span>
          <div className="flex items-center text-primary mb-2">
            <Star className="size-5 fill-primary" />
            <Star className="size-5 fill-primary" />
            <Star className="size-5 fill-primary" />
            <Star className="size-5 fill-primary" />
            <Star className="size-5 fill-primary" />
          </div>
          <span className="text-text-secondary text-sm">Overall Course Rating</span>
        </div>
        
        <div className="flex-1 w-full space-y-3">
          {[
            { stars: 5, pct: 70 },
            { stars: 4, pct: 15 },
            { stars: 3, pct: 8 },
            { stars: 2, pct: 4 },
            { stars: 1, pct: 3 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16 shrink-0">
                <Star className="size-3 text-primary fill-primary" />
                <span className="text-sm font-medium text-text-secondary">{row.stars} Star</span>
              </div>
              <div className="flex-1 h-2 bg-secondary-lighter dark:bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${row.pct}%` }}
                ></div>
              </div>
              <span className="text-sm text-text-secondary w-8 text-right">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full border border-primary transition-colors">
          All Reviews
        </button>
        <button className="px-4 py-2 bg-transparent border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface text-sm font-medium rounded-full hover:bg-primary hover:border-primary hover:text-white transition-colors">
          5 Star
        </button>
        <button className="px-4 py-2 bg-transparent border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface text-sm font-medium rounded-full hover:bg-primary hover:border-primary hover:text-white transition-colors">
          4 Star
        </button>
        <button className="px-4 py-2 bg-transparent border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface text-sm font-medium rounded-full hover:bg-primary hover:border-primary hover:text-white transition-colors">
          3 Star
        </button>
        <button className="px-4 py-2 bg-transparent border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface text-sm font-medium rounded-full hover:bg-primary hover:border-primary hover:text-white transition-colors">
          Low Ratings
        </button>
      </div>

      {/* Individual Review Cards */}
      <div className="space-y-6 mb-8">
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-secondary-lighter dark:border-secondary shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark dark:text-primary font-bold">
                  S
                </div>
                <div>
                  <h4 className="font-heading font-bold text-secondary dark:text-surface">Student Name</h4>
                  <p className="text-xs text-text-secondary">2 weeks ago</p>
                </div>
              </div>
              <div className="flex items-center text-primary">
                <Star className="size-3.5 fill-primary" />
                <Star className="size-3.5 fill-primary" />
                <Star className="size-3.5 fill-primary" />
                <Star className="size-3.5 fill-primary" />
                <Star className="size-3.5 fill-primary" />
              </div>
            </div>
            <p className="text-text-secondary font-body text-sm leading-relaxed mb-4">
              This course was exactly what I needed to kickstart my career. The instructor explains complex topics in a very simple and easy-to-understand way. Highly recommended!
            </p>
            <div className="flex items-center gap-4 border-t border-secondary-lighter dark:border-secondary pt-4">
              <span className="text-xs text-text-secondary">Was this helpful?</span>
              <button className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors text-xs font-medium">
                <ThumbsUp className="size-3.5" /> 12
              </button>
              <button className="flex items-center gap-1.5 text-text-secondary hover:text-red-500 transition-colors text-xs font-medium">
                <ThumbsDown className="size-3.5" /> 2
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button className="px-6 py-2.5 bg-transparent border border-secondary-lighter dark:border-secondary text-text-primary dark:text-surface text-sm font-semibold rounded-full hover:bg-primary hover:border-primary hover:text-white transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};
