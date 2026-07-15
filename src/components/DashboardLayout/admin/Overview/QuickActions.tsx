import Link from "next/link";
import { cn } from "@/lib/utils";
import { quickActions } from "./admin-overview-data";

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary p-6">
      <h3 className="text-lg font-heading font-bold text-text-primary dark:text-surface mb-5">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-2.5 p-4 rounded-2xl",
                "border border-border/50 dark:border-secondary/50",
                "hover:border-primary/30 dark:hover:border-primary/30",
                "hover:bg-primary-light/50 dark:hover:bg-primary-dark/10",
                "transition-all duration-200 group"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl",
                  action.bg,
                  "group-hover:scale-110 transition-transform duration-200"
                )}
              >
                <Icon className={cn("w-5 h-5", action.color)} />
              </div>
              <span className="text-xs font-semibold font-body text-text-primary dark:text-surface text-center leading-tight">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
