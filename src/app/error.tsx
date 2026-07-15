"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface dark:bg-dark-bg p-6">
      <div className="max-w-md w-full bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-danger-light dark:bg-danger-dark/30 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-danger dark:text-danger-light" />
          </div>
        </div>
        <h1 className="text-3xl font-heading font-semibold text-text-primary dark:text-surface mb-4 tracking-tight">
          Something Went Wrong
        </h1>
        <p className="text-text-secondary font-body leading-relaxed mb-8">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-danger hover:bg-danger-hover active:bg-danger-active text-white font-body font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary-light dark:bg-primary-dark/30 hover:bg-primary-light-hover text-primary-dark dark:text-primary-light font-body font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
