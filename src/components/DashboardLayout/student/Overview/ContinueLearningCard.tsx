import Image from "next/image";
import { Clock, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { continueCourse } from "./student-overview-data";

const ContinueLearningCard = () => {
  return (
    <div className="relative bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-hover to-primary-dark" />

      <div className="flex flex-col lg:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full lg:w-[420px] h-56 lg:h-auto shrink-0">
          <Image
            src={continueCourse.thumbnailUrl}
            alt={continueCourse.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

          <button
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "group/play"
            )}
            aria-label="Resume learning"
          >
            <div
              className={cn(
                "flex items-center justify-center w-16 h-16 rounded-full",
                "bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm",
                "shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
                "transition-all duration-300 group-hover/play:scale-110"
              )}
            >
              <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
            </div>
          </button>

          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1.5 text-xs font-bold font-body bg-primary/90 text-white rounded-full backdrop-blur-sm">
              {continueCourse.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-bold font-body bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full">
                Continue Learning
              </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-heading font-bold text-text-primary dark:text-surface tracking-tight mb-2 line-clamp-2">
              {continueCourse.title}
            </h3>

            <p className="text-sm font-body text-text-secondary mb-1">
              by <span className="font-semibold text-text-primary dark:text-surface">{continueCourse.instructorName}</span>
            </p>

            <p className="text-sm font-body text-text-secondary mb-5">
              Current: <span className="font-medium text-text-primary dark:text-surface">{continueCourse.currentLesson}</span>
            </p>

            {/* Progress */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-body font-medium text-text-secondary">
                  Progress
                </span>
                <span className="text-sm font-body font-bold text-primary-dark dark:text-primary">
                  {continueCourse.progressPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-secondary-lighter dark:bg-secondary/30 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r from-primary to-primary-hover",
                    "transition-all duration-700 ease-out"
                  )}
                  style={{ width: `${continueCourse.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-sm font-body text-text-secondary">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{continueCourse.estimatedTimeLeft}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold font-body",
                  "bg-primary hover:bg-primary-hover text-white",
                  "transition-all duration-200 cursor-pointer",
                  "shadow-md hover:shadow-lg"
                )}
              >
                <Play className="w-4 h-4" fill="currentColor" />
                Resume Learning
              </button>
              <button
                className={cn(
                  "flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-semibold font-body",
                  "bg-primary-light hover:bg-primary-light-hover dark:bg-primary-dark/20 dark:hover:bg-primary-dark/30",
                  "text-primary-dark dark:text-primary",
                  "transition-all duration-200 cursor-pointer"
                )}
              >
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningCard;
