import React from "react";
import Image from "next/image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { GraduationCap, Smartphone, Award, ShieldCheck, Infinity, LifeBuoy } from "lucide-react";

const benefits = [
  {
    icon: GraduationCap,
    title: "Expert-Led Courses",
    description: "Learn from certified professionals and industry leaders.",
  },
  {
    icon: Smartphone,
    title: "Learn Anywhere",
    description: "Fully responsive platform. Learn at your own pace on any device.",
  },
  {
    icon: Award,
    title: "Recognized Certificates",
    description: "Get industry-recognized certificates upon course completion.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Enterprise-grade security powered by Stripe checkout.",
  },
  {
    icon: Infinity,
    title: "Lifetime Access",
    description: "Pay once and get unlimited access to course materials forever.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Support",
    description: "Dedicated Q&A sections and support staff always available.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-surface dark:bg-dark-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Visual */}
          <div className="relative w-full aspect-[4/3] lg:aspect-square max-h-[600px] rounded-[2.5rem] bg-gradient-to-br from-primary-light/50 to-primary/10 dark:from-primary/20 dark:to-primary/5 p-4 md:p-8">
            <AnimatedReveal direction="right" delay={0.1} className="w-full h-full relative">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/50 dark:border-white/10 shadow-2xl shadow-primary/10">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students learning online"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.3)] border border-secondary-lighter dark:border-secondary/50 flex items-center gap-4 animate-bounce-slow">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="text-secondary dark:text-surface font-heading font-extrabold text-2xl">4.9/5</h4>
                  <p className="text-text-secondary text-sm font-medium">Average Rating</p>
                </div>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Content */}
          <div className="flex flex-col">
            <AnimatedReveal direction="left" delay={0.1}>
              <span className="text-primary-dark dark:text-primary-light font-bold tracking-widest text-sm mb-4 inline-block uppercase bg-primary-light/50 dark:bg-primary/10 px-4 py-1.5 rounded-full">
                Why LearnHub?
              </span>
            </AnimatedReveal>
            
            <AnimatedReveal direction="left" delay={0.2}>
              <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
                Everything You Need to Succeed
              </h2>
            </AnimatedReveal>
            
            <AnimatedReveal direction="left" delay={0.3}>
              <p className="text-text-secondary dark:text-text-secondary/80 font-body text-lg leading-relaxed mb-10">
                We provide a comprehensive learning ecosystem designed to accelerate your career. Here is why thousands of students choose us every day.
              </p>
            </AnimatedReveal>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
              {benefits.map((item, index) => (
                <AnimatedReveal 
                  key={index}
                  direction="up" 
                  delay={0.4 + index * 0.1}
                >
                  <div className="flex items-start gap-4 group">
                    <div className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary/30 rounded-2xl p-3 shrink-0 shadow-sm group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <item.icon size={22} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-secondary dark:text-surface font-heading font-bold text-lg mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary dark:text-text-secondary/80 font-body text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimatedReveal>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
