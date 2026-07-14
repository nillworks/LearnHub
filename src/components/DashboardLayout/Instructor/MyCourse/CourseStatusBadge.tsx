import React from "react"
import { cn } from "@/lib/utils"

export interface CourseStatusBadgeProps {
  status: "Draft" | "Pending" | "Published" | "Rejected"
}

export function CourseStatusBadge({ status }: CourseStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
        {
          "bg-secondary-lighter text-secondary-light border-secondary-lighter dark:bg-secondary dark:text-secondary-lighter":
            status === "Draft",
          "bg-primary-light text-primary-dark border-secondary-lighter dark:bg-primary-dark dark:text-primary-light dark:border-secondary":
            status === "Published",
          "bg-white text-secondary border-border dark:bg-[#1e293b] dark:text-surface dark:border-secondary":
            status === "Pending",
          "bg-danger-light text-danger-dark border-danger-light dark:bg-danger-dark dark:text-danger-light":
            status === "Rejected",
        }
      )}
    >
      {status}
    </span>
  )
}
