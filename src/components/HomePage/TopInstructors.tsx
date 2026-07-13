import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, BookOpen, Users, BadgeCheck } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Data Science",
    rating: 4.9,
    courses: 12,
    students: "45K",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Web Development",
    rating: 4.8,
    courses: 8,
    students: "32K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Davis",
    specialty: "UX/UI Design",
    rating: 5.0,
    courses: 15,
    students: "50K",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 4,
    name: "James Wilson",
    specialty: "Digital Marketing",
    rating: 4.7,
    courses: 10,
    students: "28K",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop",
    verified: true,
  },
];

export default function TopInstructors() {
  return (
    <section className="py-20 bg-surface dark:bg-dark-bg relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <AnimatedReveal direction="up" delay={0.1}>
              <h2 className="text-secondary dark:text-surface font-heading font-bold text-3xl md:text-4xl mb-4 tracking-tight">
                Learn From The Best
              </h2>
            </AnimatedReveal>
            <AnimatedReveal direction="up" delay={0.2}>
              <p className="text-text-secondary font-body text-lg leading-relaxed">
                Our verified instructors are industry experts with real-world experience, dedicated to helping you achieve your career goals.
              </p>
            </AnimatedReveal>
          </div>
          
          <AnimatedReveal direction="left" delay={0.3}>
            <Link 
              href="/instructors" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold transition-colors group px-6 py-3 rounded-full bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20 whitespace-nowrap shrink-0"
            >
              Meet All Instructors
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedReveal>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <AnimatedReveal 
              key={instructor.id} 
              delay={0.2 + (index * 0.1)} 
              direction="up"
              className="h-full"
            >
              <div className="group h-full bg-white dark:bg-[#1e293b]/80 backdrop-blur-xl border border-secondary-lighter/50 dark:border-secondary/30 rounded-[2rem] p-6 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgb(134,167,136,0.15)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Avatar */}
                <div className="relative w-28 h-28 mb-5 rounded-full p-1.5 bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary/50 group-hover:border-primary/50 group-hover:bg-primary/5 shadow-sm transition-all duration-500 z-10">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src={instructor.image} 
                      alt={instructor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  {/* Floating verification badge overlapping avatar */}
                  {instructor.verified && (
                    <div className="absolute bottom-1 right-1 bg-white dark:bg-[#1e293b] rounded-full p-0.5 shadow-md z-20">
                      <BadgeCheck size={22} className="text-green-500 fill-green-50 dark:fill-green-500/20" />
                    </div>
                  )}
                </div>
                
                {/* Name & Verified Icon (Inline) */}
                <div className="flex items-center gap-1.5 z-10">
                  <h3 className="text-secondary dark:text-surface font-heading font-extrabold text-xl group-hover:text-primary transition-colors duration-300">
                    {instructor.name}
                  </h3>
                </div>
                
                {/* Specialty */}
                <span className="inline-block mt-2 bg-primary-light/60 dark:bg-primary-darker/40 text-primary-dark dark:text-primary-light border border-primary/10 rounded-full px-4 py-1 text-xs font-semibold tracking-wide z-10">
                  {instructor.specialty}
                </span>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-1.5 mt-5 bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1 rounded-full z-10 border border-yellow-100 dark:border-yellow-900/50">
                  <Star size={14} className="fill-yellow-400 text-yellow-500" />
                  <span className="text-secondary dark:text-surface font-bold text-sm">
                    {instructor.rating.toFixed(1)}
                  </span>
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-center gap-5 text-text-secondary dark:text-text-secondary/80 text-sm mt-5 w-full border-t border-secondary-lighter/50 dark:border-secondary/30 pt-4 z-10">
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    <div className="p-1.5 rounded-md bg-secondary-lighter/30 dark:bg-secondary/30 group-hover:bg-primary/10">
                      <BookOpen size={16} />
                    </div>
                    <span className="font-medium">{instructor.courses}</span>
                  </div>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    <div className="p-1.5 rounded-md bg-secondary-lighter/30 dark:bg-secondary/30 group-hover:bg-primary/10">
                      <Users size={16} />
                    </div>
                    <span className="font-medium">{instructor.students}</span>
                  </div>
                </div>
                
                {/* View Profile */}
                <span className="mt-5 text-primary group-hover:text-primary-hover dark:text-primary-light dark:group-hover:text-primary text-sm font-bold transition-all duration-300 flex items-center gap-1 opacity-80 group-hover:opacity-100 z-10">
                  View Profile <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
