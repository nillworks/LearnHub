import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { recentActivities } from "./student-overview-data";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const RecentActivity = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border dark:border-secondary">
        <h3 className="text-lg font-heading font-semibold text-text-primary dark:text-surface">
          Recent Activity
        </h3>
        <Link
          href="/dashboard/student/my-learning"
          className="flex items-center gap-1.5 text-sm font-semibold font-body text-primary hover:text-primary-hover transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-border dark:divide-secondary">
        {recentActivities.map((activity) => (
          <div
            key={activity._id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-primary-light/50 dark:hover:bg-primary-dark/10 transition-colors duration-200"
          >
            <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0">
              <Image
                src={activity.thumbnailUrl}
                alt={activity.courseTitle}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold font-body text-text-primary dark:text-surface truncate">
                {activity.courseTitle}
              </p>
              <p className="text-xs font-body text-text-secondary mt-0.5">
                {activity.instructorName}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-1.5 bg-secondary-lighter dark:bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r from-primary to-primary-hover"
                    )}
                    style={{ width: `${activity.progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-bold font-body text-primary-dark dark:text-primary">
                  {activity.progressPercent}%
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-xs font-body text-text-secondary">
                {formatDate(activity.lastAccessedAt)}
              </span>
              <button
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold font-body",
                  "bg-primary-light hover:bg-primary-light-hover dark:bg-primary-dark/20 dark:hover:bg-primary-dark/30",
                  "text-primary-dark dark:text-primary",
                  "transition-all duration-200 cursor-pointer"
                )}
              >
                Resume
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
