import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  GraduationCap, 
  Star, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Award,
  PlayCircle,
  Sparkles
} from "lucide-react";
import { AnimatedStat } from "@/components/ui/animated-stat";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-surface dark:bg-dark-bg pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Animated Background Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[400px] md:h-[600px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/3 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Center Content */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto z-10 relative">
          
          {/* Animated Badge */}
          <AnimatedReveal delay={0.2}>
            <div className="group relative inline-flex items-center gap-2 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md text-primary-dark dark:text-primary-light border border-primary/20 dark:border-primary/30 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm mb-8 hover:shadow-md transition-all hover:-translate-y-1 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span>Redefining Online Learning Experience</span>
            </div>
          </AnimatedReveal>

          {/* Heading with Gradient Text */}
          <AnimatedReveal delay={0.3}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-secondary dark:text-surface leading-[1.1] mb-6 drop-shadow-sm">
              Elevate Your Skills With <br className="hidden md:block" />
              <span className="relative inline-block mt-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500 dark:from-primary-light dark:to-emerald-300">
                World-Class Mentors
              </span>
            </h1>
          </AnimatedReveal>

          {/* Subheading */}
          <AnimatedReveal delay={0.4}>
            <p className="text-lg md:text-xl text-text-secondary font-body leading-relaxed max-w-3xl mb-12">
              Join thousands of learners worldwide. Access premium courses, interactive projects, and 1-on-1 mentorship to accelerate your career growth in the tech industry.
            </p>
          </AnimatedReveal>

          {/* Glowing Floating Search Bar & Actions */}
          <AnimatedReveal delay={0.5} className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mb-16 mx-auto relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-emerald-400/30 rounded-3xl blur-lg opacity-50 dark:opacity-30" />
              
              <div className="relative flex-1 w-full bg-white dark:bg-[#1e293b] rounded-2xl p-2 shadow-xl shadow-primary/10 border border-white/50 dark:border-secondary-lighter/20 flex items-center transition-all focus-within:ring-4 focus-within:ring-primary/20">
                <Search size={22} className="absolute left-5 text-text-secondary" />
                <Input 
                  type="text" 
                  placeholder="What do you want to learn today?" 
                  className="pl-14 h-14 border-none shadow-none focus-visible:ring-0 bg-transparent text-text-primary dark:text-surface font-body text-lg w-full placeholder:text-text-secondary/60"
                />
                <Button size="lg" className="cursor-pointer h-12 px-8 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary-hover hover:to-emerald-600 border-0 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  Explore
                </Button>
              </div>
              
              <Button size="lg" variant="outline" className="cursor-pointer relative h-16 px-8 text-secondary dark:text-surface hover:bg-surface dark:hover:bg-[#1e293b] rounded-2xl font-semibold text-base transition-all duration-200 shadow-lg border border-secondary-lighter dark:border-secondary bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md overflow-hidden group">
                <div className="absolute inset-0 w-0 bg-primary/5 transition-all duration-300 ease-out group-hover:w-full" />
                <PlayCircle size={22} className="mr-2 text-primary" />
                <span className="relative">Watch Demo</span>
              </Button>
            </div>
          </AnimatedReveal>

          {/* Stats Glass Ribbon */}
          <AnimatedReveal delay={0.6}>
            <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-20 bg-white/40 dark:bg-[#1e293b]/40 backdrop-blur-xl border border-white/60 dark:border-secondary-lighter/10 rounded-3xl px-8 py-5 shadow-lg shadow-primary/5">
              <div className="flex items-center gap-4">
                <div className="bg-primary-light dark:bg-primary-darker/60 rounded-full p-3 text-primary">
                  <Users size={22} />
                </div>
                <div className="text-left">
                  <AnimatedStat value={50} suffix="K+" className="font-heading font-extrabold text-2xl text-secondary dark:text-surface leading-none block" />
                  <p className="text-xs font-medium text-text-secondary font-body mt-1 uppercase tracking-wider">Active Students</p>
                </div>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-secondary-lighter/50 dark:bg-secondary" />

              <div className="flex items-center gap-4">
                <div className="bg-primary-light dark:bg-primary-darker/60 rounded-full p-3 text-primary">
                  <BookOpen size={22} />
                </div>
                <div className="text-left">
                  <AnimatedStat value={500} suffix="+" className="font-heading font-extrabold text-2xl text-secondary dark:text-surface leading-none block" />
                  <p className="text-xs font-medium text-text-secondary font-body mt-1 uppercase tracking-wider">Premium Courses</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-secondary-lighter/50 dark:bg-secondary" />

              <div className="flex items-center gap-4">
                <div className="bg-primary-light dark:bg-primary-darker/60 rounded-full p-3 text-primary">
                  <Award size={22} />
                </div>
                <div className="text-left">
                  <AnimatedStat value={200} suffix="+" className="font-heading font-extrabold text-2xl text-secondary dark:text-surface leading-none block" />
                  <p className="text-xs font-medium text-text-secondary font-body mt-1 uppercase tracking-wider">Top Instructors</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>

        {/* 3D Perspective Dashboard Image Reveal */}
        <AnimatedReveal delay={0.7} className="w-full">
          <div className="relative w-full max-w-6xl mx-auto z-20" style={{ perspective: '1000px' }}>
            <div 
              className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden border-[8px] border-white/80 dark:border-[#1e293b]/80 shadow-[0_40px_100px_-20px_rgba(134,167,136,0.3)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-transform duration-700 hover:rotate-0"
              style={{ transform: 'rotateX(8deg) translateY(-20px)', transformOrigin: 'top center' }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop" 
                alt="Platform Dashboard on MacBook" 
                fill
                className="object-cover object-center"
                priority
              />
              {/* Inner glow and gradient for realism */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-t-[2rem] md:rounded-t-[3rem] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface dark:from-dark-bg via-surface/80 dark:via-dark-bg/80 to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1 - Rating */}
            <div className="absolute top-16 md:top-24 -left-4 md:-left-16 z-30 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white dark:border-secondary flex items-center gap-4 animate-bounce" style={{ animationDuration: '3.5s' }}>
              <div className="bg-orange-500/10 dark:bg-orange-500/20 p-3 rounded-xl text-orange-500">
                <Star size={26} className="fill-orange-500" />
              </div>
              <div>
                <p className="font-heading font-extrabold text-xl text-secondary dark:text-surface leading-tight">4.9/5.0</p>
                <p className="text-sm font-medium text-text-secondary font-body">Average Rating</p>
              </div>
            </div>

            {/* Floating Card 2 - Course Completed */}
            <div className="absolute bottom-32 md:bottom-40 -right-4 md:-right-16 z-30 bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white dark:border-secondary flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
                <CheckCircle size={26} />
              </div>
              <div>
                <AnimatedStat value={100} suffix="K+" className="font-heading font-extrabold text-xl text-secondary dark:text-surface leading-tight block" />
                <p className="text-sm font-medium text-text-secondary font-body">Careers Accelerated</p>
              </div>
            </div>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
}
