import { Star, Users, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { topCourse } from "./overview-data";

const TopPerformingCourse = () => {
  return (
    <div className="relative bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-hover to-primary-dark" />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-light dark:bg-primary-dark/20 rounded-full">
            <Award className="w-4 h-4 text-primary-dark dark:text-primary" />
            <span className="text-xs font-bold font-body text-primary-dark dark:text-primary">
              Top Performer
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
            <img
              src={topCourse.thumbnailUrl}
              alt={topCourse.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">{topCourse.rating}</span>
            </div>
          </div>

          <div className="flex-1">
            <span className="inline-block px-3 py-1 text-xs font-semibold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full mb-3">
              {topCourse.category}
            </span>
            <h4 className="text-lg font-heading font-bold text-text-primary dark:text-surface mb-3 line-clamp-1">
              {topCourse.title}
            </h4>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-text-secondary" />
                  <span className="text-xs font-body text-text-secondary">Students</span>
                </div>
                <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
                  {topCourse.studentsEnrolled.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-text-secondary" />
                  <span className="text-xs font-body text-text-secondary">Completion</span>
                </div>
                <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
                  {topCourse.completionRate}%
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-body text-text-secondary">$</span>
                  <span className="text-xs font-body text-text-secondary">Revenue</span>
                </div>
                <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
                  ${topCourse.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-border dark:border-secondary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-body font-medium text-text-secondary">
              Student Completion Rate
            </span>
            <span className="text-xs font-body font-bold text-primary-dark dark:text-primary">
              {topCourse.completionRate}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary-lighter dark:bg-secondary/30 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r from-primary to-primary-hover",
                "transition-all duration-700 ease-out"
              )}
              style={{ width: `${topCourse.completionRate}%` }}
            />
          </div>
        </div>

        <button
          className={cn(
            "w-full mt-5 px-5 py-3 rounded-2xl text-sm font-semibold font-body",
            "bg-primary-light hover:bg-primary-light-hover dark:bg-primary-dark/20 dark:hover:bg-primary-dark/30",
            "text-primary-dark dark:text-primary",
            "transition-all duration-200 cursor-pointer"
          )}
        >
          View Analytics →
        </button>
      </div>
    </div>
  );
};

export default TopPerformingCourse;
