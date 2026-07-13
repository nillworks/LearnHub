import React from "react";
import { Users, BookOpen, Award, Star } from "lucide-react";
import { AnimatedStat } from "@/components/ui/animated-stat";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export default function PlatformStatistics() {
  return (
    <section className="w-full bg-primary-darker dark:bg-[#1e293b] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 md:divide-x md:divide-primary-dark dark:md:divide-secondary-lighter/20">
          
          {/* Stat 1 - Students */}
          <AnimatedReveal delay={0.1} direction="up" className="flex flex-col items-center gap-3 text-center px-4">
            <Users size={32} className="text-primary" />
            <AnimatedStat 
              value={50000} 
              suffix="+" 
              className="font-heading font-bold text-4xl md:text-5xl text-white" 
            />
            <span className="text-secondary-lighter text-sm font-body">Students Enrolled</span>
          </AnimatedReveal>

          {/* Stat 2 - Courses */}
          <AnimatedReveal delay={0.2} direction="up" className="flex flex-col items-center gap-3 text-center px-4">
            <BookOpen size={32} className="text-primary" />
            <AnimatedStat 
              value={500} 
              suffix="+" 
              className="font-heading font-bold text-4xl md:text-5xl text-white" 
            />
            <span className="text-secondary-lighter text-sm font-body">Expert Courses</span>
          </AnimatedReveal>

          {/* Stat 3 - Instructors */}
          <AnimatedReveal delay={0.3} direction="up" className="flex flex-col items-center gap-3 text-center px-4">
            <Award size={32} className="text-primary" />
            <AnimatedStat 
              value={200} 
              suffix="+" 
              className="font-heading font-bold text-4xl md:text-5xl text-white" 
            />
            <span className="text-secondary-lighter text-sm font-body">Top Instructors</span>
          </AnimatedReveal>

          {/* Stat 4 - Rating */}
          <AnimatedReveal delay={0.4} direction="up" className="flex flex-col items-center gap-3 text-center px-4">
            <Star size={32} className="text-primary" />
            <AnimatedStat 
              value={4.9} 
              decimals={1}
              className="font-heading font-bold text-4xl md:text-5xl text-white" 
            />
            <span className="text-secondary-lighter text-sm font-body">Average Rating</span>
          </AnimatedReveal>

        </div>
      </div>
    </section>
  );
}
