import React from "react";
import { Code, Database, Palette, Megaphone, Briefcase, Camera } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

const categories = [
  { name: "Web Dev", count: "1,200+ Courses", icon: Code },
  { name: "Data Science", count: "850+ Courses", icon: Database },
  { name: "Design", count: "900+ Courses", icon: Palette },
  { name: "Marketing", count: "600+ Courses", icon: Megaphone },
  { name: "Business", count: "1,100+ Courses", icon: Briefcase },
  { name: "Photography", count: "450+ Courses", icon: Camera },
];

export default function PopularCategories() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <AnimatedReveal direction="up" delay={0.1}>
            <span className="bg-primary-light text-primary-dark border border-secondary-lighter dark:border-secondary-lighter/20 rounded-full px-3 py-1 text-xs mb-3 inline-block font-semibold">
              Trending Topics
            </span>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.2}>
            <h2 className="text-secondary dark:text-surface font-heading font-bold text-3xl md:text-4xl mb-4">
              Popular Categories
            </h2>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.3}>
            <p className="text-text-secondary font-body max-w-xl mx-auto">
              Discover a wide range of top-rated courses across various fields. Whether you're a beginner or an expert, we have something for you.
            </p>
          </AnimatedReveal>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <AnimatedReveal 
                key={category.name} 
                delay={0.3 + (index * 0.1)} 
                direction="up"
                className="h-full"
              >
                <div className="h-full bg-primary-light/50 dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary-lighter/10 rounded-3xl p-6 flex flex-col items-center gap-3 text-center cursor-pointer group hover:bg-primary-light dark:hover:bg-[#1e293b]/80 hover:border-primary dark:hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  
                  {/* Icon Container */}
                  <div className="bg-primary-light dark:bg-primary/10 group-hover:bg-primary rounded-2xl p-3 transition-colors duration-300">
                    <Icon size={28} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  {/* Text Container */}
                  <div>
                    <h3 className="text-secondary dark:text-surface font-heading font-semibold text-sm mt-1 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary text-xs mt-1">
                      {category.count}
                    </p>
                  </div>

                </div>
              </AnimatedReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
