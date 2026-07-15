import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatItem } from "./overview-data";

interface StatCardProps {
  stat: StatItem;
}

const StatCard = ({ stat }: StatCardProps) => {
  const Icon = stat.icon;

  return (
    <div
      className={cn(
        "group relative bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary",
        "p-6 overflow-hidden transition-all duration-300",
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1",
        "dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-3xl",
          stat.trendUp ? "bg-primary" : "bg-secondary-lighter"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40 rounded-3xl",
          stat.bgGradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-2xl",
            "bg-primary-light dark:bg-primary-dark/20",
            "transition-transform duration-300 group-hover:scale-110"
          )}
        >
          <Icon className={cn("w-5 h-5", stat.color)} />
        </div>

        <div
          className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-body",
            stat.trendUp
              ? "bg-primary-light text-primary-dark dark:bg-primary-dark/20 dark:text-primary"
              : "bg-danger-light text-danger-dark dark:bg-danger-dark/20 dark:text-danger"
          )}
        >
          {stat.trendUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {stat.trend}
        </div>
      </div>

      <div className="relative mt-6">
        <p className="text-3xl font-bold font-heading text-text-primary dark:text-surface tracking-tight">
          {stat.value}
        </p>
        <p className="mt-1 text-sm font-medium font-body text-text-secondary">
          {stat.title}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
