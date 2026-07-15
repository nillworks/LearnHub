import { Clock, Flame, TrendingUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { learningSummary } from "./student-overview-data";

const LearningSummary = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="px-6 py-5 border-b border-border dark:border-secondary">
        <h3 className="text-lg font-heading font-semibold text-text-primary dark:text-surface">
          Learning Summary
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-primary-light/50 dark:bg-primary-dark/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#1e293b] shadow-sm">
            <Clock className="w-5 h-5 text-primary-dark dark:text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-body text-text-secondary">
              Weekly Learning Hours
            </p>
            <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
              {learningSummary.weeklyHours}h
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-primary-light/50 dark:bg-primary-dark/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#1e293b] shadow-sm">
            <Flame className="w-5 h-5 text-primary-dark dark:text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-body text-text-secondary">
              Current Learning Streak
            </p>
            <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
              {learningSummary.currentStreak} days
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-primary-light/50 dark:bg-primary-dark/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#1e293b] shadow-sm">
            <TrendingUp className="w-5 h-5 text-primary-dark dark:text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-body text-text-secondary">
              Overall Completion Rate
            </p>
            <div className="flex items-center gap-3">
              <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
                {learningSummary.completionRate}%
              </p>
              <div className="flex-1 h-1.5 bg-secondary-lighter dark:bg-secondary/30 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r from-primary to-primary-hover"
                  )}
                  style={{ width: `${learningSummary.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-primary-light/50 dark:bg-primary-dark/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#1e293b] shadow-sm">
            <Heart className="w-5 h-5 text-primary-dark dark:text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-body text-text-secondary">
              Favorite Category
            </p>
            <p className="text-lg font-bold font-heading text-text-primary dark:text-surface">
              {learningSummary.favoriteCategory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSummary;
