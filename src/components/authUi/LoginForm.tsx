"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

const EyeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
)
const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
)
const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
)
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
)
const TargetIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
)

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center bg-surface dark:bg-dark-bg py-12 lg:py-0 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-light/40 dark:bg-primary-darker/20 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary-light/30 dark:bg-primary-darker/20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Visuals & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pr-0 lg:pr-12 xl:pr-24">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1e293b] border border-border/50 shadow-sm text-primary-dark dark:text-primary-light font-semibold text-sm mb-8 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Welcome back to LearnHub
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary dark:text-surface tracking-tight leading-[1.1] mb-6">
              Pick up right where you <span className="text-primary relative inline-block">
                left off.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-light/60 dark:text-primary-dark/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-text-secondary font-body leading-relaxed mb-12">
              Your personalized curriculum, expert mentors, and community discussions are waiting for you. Log in to continue your journey.
            </p>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl border border-white/20 dark:border-secondary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-primary-darker flex items-center justify-center text-primary-dark dark:text-primary-light mb-4 group-hover:scale-110 transition-transform duration-300">
                  <SparklesIcon />
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary dark:text-surface mb-2">Resume Courses</h3>
                <p className="text-sm text-text-secondary font-body leading-relaxed">Jump back into your active lessons seamlessly without missing a beat.</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl border border-white/20 dark:border-secondary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-primary-darker flex items-center justify-center text-primary-dark dark:text-primary-light mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TargetIcon />
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary dark:text-surface mb-2">Track Progress</h3>
                <p className="text-sm text-text-secondary font-body leading-relaxed">Keep your daily learning streak alive and hit your weekly goals.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full bg-white dark:bg-[#1e293b] rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border/50 relative overflow-hidden group/card">
              
              {/* Subtle inner glow for premium feel */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-light/50 dark:bg-primary-darker/50 rounded-full blur-3xl pointer-events-none opacity-50 group-hover/card:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-heading font-bold text-text-primary dark:text-surface tracking-tight mb-3">
                    Sign In
                  </h2>
                  <p className="text-text-secondary font-body leading-relaxed">
                    Enter your email and password to access your account securely.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Email Field */}
                  <div className="space-y-2.5">
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary dark:text-surface font-body">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors duration-300">
                        <MailIcon />
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g., alex@company.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-[#0f172a] border border-border dark:border-secondary rounded-2xl text-text-primary dark:text-surface placeholder:text-text-secondary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 font-body"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-semibold text-text-primary dark:text-surface font-body">
                        Password
                      </label>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors duration-300">
                        <LockIcon />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your secure password"
                        className="w-full pl-12 pr-12 py-3.5 bg-surface dark:bg-[#0f172a] border border-border dark:border-secondary rounded-2xl text-text-primary dark:text-surface placeholder:text-text-secondary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 font-body"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-text-primary dark:hover:text-surface transition-colors focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 font-body mt-4"
                  >
                    Sign In
                    <ArrowRightIcon />
                  </button>
                </form>

                {/* Footer Link */}
                <div className="mt-10 text-center">
                  <p className="text-text-secondary font-body">
                    Don't have an account?{" "}
                    <Link 
                      href="/register" 
                      className="font-semibold text-text-primary dark:text-surface hover:text-primary dark:hover:text-primary-hover transition-colors underline decoration-primary/30 underline-offset-4"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
