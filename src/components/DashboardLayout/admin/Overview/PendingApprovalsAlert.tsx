import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PendingApprovalsAlertProps {
  count: number;
}

const PendingApprovalsAlert = ({ count }: PendingApprovalsAlertProps) => {
  if (count <= 0) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border",
        "bg-gradient-to-r from-amber-50 via-orange-50 to-red-50",
        "dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20",
        "border-amber-200 dark:border-amber-800/40",
        "p-6 md:p-8"
      )}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/40 shrink-0">
          <AlertTriangle className="w-7 h-7 text-amber-600 dark:text-amber-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-heading font-bold text-amber-900 dark:text-amber-200">
              Courses Awaiting Review
            </h3>
            <span className="px-2.5 py-0.5 text-xs font-bold font-body bg-amber-200 dark:bg-amber-800/60 text-amber-800 dark:text-amber-300 rounded-full">
              {count} pending
            </span>
          </div>
          <p className="text-sm font-body text-amber-700 dark:text-amber-400/80">
            There are courses waiting for administrator approval. Review them to maintain platform quality.
          </p>
        </div>

        <Link
          href="/dashboard/admin/pending"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold font-body shrink-0",
            "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white",
            "transition-colors duration-200 shadow-sm shadow-amber-200 dark:shadow-amber-900/30"
          )}
        >
          Review Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PendingApprovalsAlert;
