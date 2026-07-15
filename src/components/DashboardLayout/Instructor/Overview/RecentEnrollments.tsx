import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { recentEnrollments } from "./overview-data";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const RecentEnrollments = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border dark:border-secondary">
        <h3 className="text-lg font-heading font-semibold text-text-primary dark:text-surface">
          Recent Enrollments
        </h3>
        <Link
          href="/dashboard/instructor/students"
          className="flex items-center gap-1.5 text-sm font-semibold font-body text-primary hover:text-primary-hover transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-border dark:divide-secondary">
        {recentEnrollments.map((enrollment) => (
          <div
            key={enrollment._id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-primary-light/50 dark:hover:bg-primary-dark/10 transition-colors duration-200"
          >
            <img
              src={enrollment.studentAvatar}
              alt={enrollment.studentName}
              className="w-10 h-10 rounded-full ring-2 ring-primary-light dark:ring-primary-dark/30 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold font-body text-text-primary dark:text-surface truncate">
                {enrollment.studentName}
              </p>
              <p className="text-xs font-body text-text-secondary truncate mt-0.5">
                {enrollment.courseName}
              </p>
            </div>
            <span className="text-xs font-body text-text-secondary whitespace-nowrap">
              {formatDate(enrollment.enrolledAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEnrollments;
