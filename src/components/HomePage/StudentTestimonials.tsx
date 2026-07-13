import React from "react";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    course: "Full-Stack Web Development",
    text: "I was skeptical about online bootcamps, but this platform completely changed my perspective. The curriculum is perfectly structured, and the 1-on-1 mentorship helped me land my first junior developer role within 4 months of graduating.",
    rating: 5,
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&auto=format&fit=crop",
    verified: true
  },
  {
    id: 2,
    name: "Samantha Lee",
    course: "Data Science Bootcamp",
    text: "The machine learning modules were incredibly detailed. What I loved most was building real-world projects that I could actually put on my portfolio. The community is also super supportive when you get stuck.",
    rating: 5,
    date: "1 month ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    verified: true
  },
  {
    id: 3,
    name: "David Smith",
    course: "UX/UI Masterclass",
    text: "As a graphic designer trying to transition into UX, this course was a godsend. Emma's teaching style is so engaging. The career services team even helped me revamp my resume. Highly recommended!",
    rating: 5,
    date: "3 months ago",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
    verified: true
  }
];

export default function StudentTestimonials() {
  return (
    <section className="py-24 bg-white dark:bg-[#1e293b] relative overflow-hidden">
      {/* Subtle Premium Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedReveal direction="up" delay={0.1}>
            <span className="text-primary-dark dark:text-primary-light font-bold tracking-widest text-sm mb-4 inline-block uppercase bg-primary-light/50 dark:bg-primary/10 px-4 py-1.5 rounded-full">
              Success Stories
            </span>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.2}>
            <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
              Don't just take our word for it
            </h2>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.3}>
            <p className="text-text-secondary dark:text-text-secondary/80 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
              Discover how our platform has transformed the careers and lives of thousands of learners worldwide.
            </p>
          </AnimatedReveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedReveal 
              key={testimonial.id} 
              delay={0.3 + (index * 0.1)} 
              direction="up"
              className="h-full"
            >
              <div className="group h-full bg-surface dark:bg-dark-bg/80 border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-6 lg:p-8 flex flex-col hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                
                {/* Header: Stars & Date */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/30 px-2 py-1.5 rounded-full border border-yellow-100 dark:border-yellow-900/50 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < testimonial.rating ? "fill-yellow-400 text-yellow-500" : "fill-transparent text-secondary-lighter dark:text-secondary"} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-text-secondary/70 dark:text-text-secondary/60 whitespace-nowrap">
                    {testimonial.date}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="mb-8 flex-grow">
                  <p className="text-secondary dark:text-surface/90 font-body leading-relaxed text-base">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Footer: User Profile */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-secondary-lighter/60 dark:border-secondary/30">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-secondary-lighter/30">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-secondary dark:text-surface font-heading font-bold text-base truncate">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <BadgeCheck size={16} className="text-green-500 fill-green-50 dark:fill-green-500/20 shrink-0" />
                      )}
                    </div>
                    <span className="text-text-secondary dark:text-text-secondary/70 text-sm font-medium mt-0.5 truncate">
                      {testimonial.course}
                    </span>
                  </div>
                </div>

              </div>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
