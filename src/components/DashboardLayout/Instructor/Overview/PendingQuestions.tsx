"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { pendingQuestions } from "./overview-data";

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const PendingQuestions = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-border dark:border-secondary overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border dark:border-secondary">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-heading font-semibold text-text-primary dark:text-surface">
            Pending Questions
          </h3>
          <span className="flex items-center justify-center w-6 h-6 text-xs font-bold font-body bg-danger text-white rounded-full">
            {pendingQuestions.length}
          </span>
        </div>
        <Link
          href="/dashboard/instructor/qa"
          className="flex items-center gap-1.5 text-sm font-semibold font-body text-primary hover:text-primary-hover transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-border dark:divide-secondary">
        {pendingQuestions.map((q) => (
          <div
            key={q._id}
            className="px-6 py-4 hover:bg-primary-light/50 dark:hover:bg-primary-dark/10 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <img
                src={q.studentAvatar}
                alt={q.studentName}
                className="w-9 h-9 rounded-full ring-2 ring-primary-light dark:ring-primary-dark/30 object-cover shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold font-body text-text-primary dark:text-surface">
                    {q.studentName}
                  </p>
                  <span className="text-xs font-body text-text-secondary">
                    {formatTimeAgo(q.askedAt)}
                  </span>
                </div>
                <p className="text-sm font-body text-text-secondary line-clamp-2 leading-relaxed mb-2">
                  {q.question}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-body text-text-secondary truncate">
                    {q.courseName}
                  </span>
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-body",
                      "bg-primary-light hover:bg-primary-light-hover dark:bg-primary-dark/20 dark:hover:bg-primary-dark/30",
                      "text-primary-dark dark:text-primary",
                      "transition-all duration-200 cursor-pointer shrink-0"
                    )}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingQuestions;
