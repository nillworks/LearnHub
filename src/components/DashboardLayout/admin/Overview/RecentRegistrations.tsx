import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { recentUsers } from "./admin-overview-data";

const RecentRegistrations = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-0">
        <h3 className="text-lg font-heading font-bold text-text-primary dark:text-surface">
          Recent Registrations
        </h3>
        <Link
          href="/dashboard/admin/users"
          className="inline-flex items-center gap-1.5 text-sm font-semibold font-body text-primary hover:text-primary-hover transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-6 pt-4">
        <div className="space-y-1">
          {recentUsers.map((user, index) => (
            <div
              key={user._id}
              className={cn(
                "flex items-center gap-4 p-3 rounded-2xl transition-colors duration-200",
                "hover:bg-primary-light/50 dark:hover:bg-primary-dark/10",
                index !== recentUsers.length - 1 && "border-b border-border/50 dark:border-secondary/50"
              )}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-body text-text-primary dark:text-surface truncate">
                  {user.name}
                </p>
                <p className="text-xs font-body text-text-secondary truncate">
                  {user.email}
                </p>
              </div>

              <span
                className={cn(
                  "px-2.5 py-1 text-[11px] font-bold font-body rounded-full shrink-0 uppercase tracking-wider",
                  user.role === "instructor"
                    ? "bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary"
                    : "bg-secondary-lighter dark:bg-secondary/30 text-secondary dark:text-secondary-lighter"
                )}
              >
                {user.role}
              </span>

              <span className="text-xs font-body text-text-secondary shrink-0 hidden sm:block">
                {new Date(user.registeredAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentRegistrations;
