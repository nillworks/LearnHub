import React from 'react';
import Link from 'next/link';
import { ShieldX, Home, ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: 'Unauthorized Access | LearnHub',
  description: 'You do not have permission to access this page.',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-surface dark:bg-dark-bg p-6 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-80px] left-[-80px] w-[340px] h-[340px] bg-danger/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative">
        {/* Card */}
        <div className="bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 text-center shadow-sm">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-danger/10 dark:bg-danger/20 p-5 rounded-full">
                <ShieldX className="w-12 h-12 text-danger" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#1e293b] rounded-full p-1 border border-border dark:border-secondary shadow-sm">
                <Lock className="w-4 h-4 text-danger" />
              </div>
            </div>
          </div>

          {/* Error code */}
          <p className="text-danger font-heading font-bold text-sm uppercase tracking-widest mb-2">
            403 — Forbidden
          </p>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary dark:text-surface mb-3 tracking-tight">
            Access Denied
          </h1>

          {/* Description */}
          <p className="text-text-secondary font-body leading-relaxed mb-8 text-sm">
            You don't have permission to view this page. This area is restricted to authorized users only. Please contact an administrator if you believe this is a mistake.
          </p>

          {/* Divider */}
          <div className="border-t border-border dark:border-secondary mb-6" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-body font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="javascript:history.back()"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-surface dark:bg-dark-bg hover:bg-primary-light border border-border dark:border-secondary text-text-primary dark:text-surface font-body font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </div>
        </div>

        {/* Bottom hint */}
        <p className="text-center text-text-secondary text-xs mt-5 font-body">
          Need access?{' '}
          <Link href="/contact" className="text-primary hover:text-primary-hover font-medium transition-colors underline underline-offset-2">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
