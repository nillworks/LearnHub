import React from 'react'
import Link from 'next/link'
import { Hammer } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-surface dark:bg-dark-bg p-6">
      <div className="max-w-md w-full bg-white dark:bg-[#1e293b] border border-border dark:border-secondary rounded-3xl p-8 text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-light dark:bg-primary-dark/30 p-4 rounded-full">
            <Hammer className="w-12 h-12 text-primary dark:text-primary-light" />
          </div>
        </div>
        <h1 className="text-3xl font-heading font-semibold text-text-primary dark:text-surface mb-4 tracking-tight">
          Work in Progress
        </h1>
        <p className="text-text-secondary font-body leading-relaxed mb-8">
          We're currently working hard to build this page. It hasn't been created yet, but it will be available soon. Stay tuned!
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-body font-semibold rounded-xl px-6 py-3 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
