"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import CustomToast from "@/shared/CustomToast"

import { Eye as EyeIcon, EyeOff as EyeOffIcon, Mail as MailIcon, Lock as LockIcon, ArrowRight as ArrowRightIcon, Sparkles as SparklesIcon, Target as TargetIcon } from "lucide-react"

export interface LoginFormData {
  email: string;
  password?: string;
}

export interface LoginResponse {
  success?: boolean;
  error?: string;
}

export default function LoginForm({ onSubmit }: { onSubmit: (data: LoginFormData) => Promise<LoginResponse> | LoginResponse }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleClearError = (field: string) => {
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formDataObj = new FormData(e.currentTarget)
    const data = Object.fromEntries(formDataObj.entries())
    
    let hasError = false
    const newErrors = { email: '', password: '' }

    if (!data.email) {
      newErrors.email = 'Email is required'
      hasError = true
    } else if (!/\S+@\S+\.\S+/.test(data.email as string)) {
      newErrors.email = 'Invalid email address'
      hasError = true
    }

    if (!data.password) {
      newErrors.password = 'Password is required'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    const formElement = e.currentTarget
    
    try {
      const submitData: LoginFormData = { email: data.email as string, password: data.password as string }
      const res = await onSubmit(submitData)
      
      if (res?.error) {
        CustomToast('error', 'Login Failed', res.error)
      } else {
        router.push('/')
        router.refresh()
        CustomToast('success', 'Welcome Back!', 'You have successfully logged in.')
        formElement.reset()
      }
    } catch (error: any) {
      console.error('Login error:', error)
      CustomToast('error', 'Error', error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center bg-surface dark:bg-dark-bg py-12 lg:py-16 relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary-light/40 dark:bg-primary-darker/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-primary-light/30 dark:bg-primary-darker/20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Visuals & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pr-0 lg:pr-12 xl:pr-24">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-[#1e293b] border border-border/60 shadow-sm text-text-secondary dark:text-surface font-medium text-sm mb-10 w-fit">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Welcome back to LearnHub
            </div>
            
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4rem] font-heading font-bold text-text-primary dark:text-surface tracking-tight leading-[1.1] mb-6">
              Pick up right where you <br className="hidden sm:block" />
              <span className="text-primary relative inline-block mt-1">
                left off.
                <span className="absolute bottom-0 left-0 w-full h-[45%] bg-primary-light dark:bg-primary-darker/50 -z-10"></span>
              </span>
            </h1>
            
            <p className="text-lg text-text-secondary font-body leading-relaxed mb-12 max-w-[540px]">
              Your personalized curriculum, expert mentors, and community discussions are waiting for you. Log in to continue your journey.
            </p>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2rem] bg-white dark:bg-[#1e293b] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-border/40 group">
                <div className="w-12 h-12 rounded-[1rem] bg-surface dark:bg-dark-bg flex items-center justify-center text-primary-dark dark:text-primary-light mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary dark:text-surface mb-3">Resume Courses</h3>
                <p className="text-text-secondary font-body leading-relaxed text-[15px]">Jump back into your active lessons seamlessly without missing a beat.</p>
              </div>
              
              <div className="p-8 rounded-[2rem] bg-white dark:bg-[#1e293b] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-border/40 group">
                <div className="w-12 h-12 rounded-[1rem] bg-surface dark:bg-dark-bg flex items-center justify-center text-primary-dark dark:text-primary-light mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TargetIcon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary dark:text-surface mb-3">Track Progress</h3>
                <p className="text-text-secondary font-body leading-relaxed text-[15px]">Keep your daily learning streak alive and hit your weekly goals.</p>
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

                <form className="space-y-6" onSubmit={handleSubmit}>
                  
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
                        name="email"
                        type="email"
                        onChange={() => handleClearError('email')}
                        placeholder="e.g., alex@company.com"
                        className={cn(
                          "w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-[#0f172a] border rounded-2xl text-text-primary dark:text-surface placeholder:text-text-secondary/50 focus:outline-none focus:ring-4 transition-all duration-300 font-body",
                          errors.email ? "border-danger focus:ring-danger/10 focus:border-danger" : "border-border dark:border-secondary focus:ring-primary/10 focus:border-primary"
                        )}
                      />
                    </div>
                    {errors.email && <p className="text-danger-dark text-xs font-semibold">{errors.email}</p>}
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
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={() => handleClearError('password')}
                        placeholder="Enter your password"
                        className={cn(
                          "w-full pl-12 pr-12 py-3.5 bg-surface dark:bg-[#0f172a] border rounded-2xl text-text-primary dark:text-surface placeholder:text-text-secondary/50 focus:outline-none focus:ring-4 transition-all duration-300 font-body",
                          errors.password ? "border-danger focus:ring-danger/10 focus:border-danger" : "border-border dark:border-secondary focus:ring-primary/10 focus:border-primary"
                        )}
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
                    {errors.password && <p className="text-danger-dark text-xs font-semibold">{errors.password}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-primary/70 disabled:cursor-not-allowed cursor-pointer text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 font-body mt-4"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRightIcon />
                      </>
                    )}
                  </button>
                </form>

                {/* Google Login Divider & Button */}
                <div className="mt-6">
                  <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-border/60"></div>
                    <span className="flex-shrink-0 mx-4 text-text-secondary text-sm font-body">Or continue with</span>
                    <div className="flex-grow border-t border-border/60"></div>
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-surface hover:bg-border/30 text-text-primary dark:text-surface font-semibold py-3.5 px-4 rounded-2xl border border-border dark:border-secondary transition-all duration-300 font-body cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                </div>

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
