import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary-dark dark:bg-[#0a0f1a] py-24 md:py-32">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-light/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" style={{ backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <AnimatedReveal direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-white/10 dark:bg-primary-light/10 text-white border border-white/20 dark:border-primary-light/20 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-md">
              <Sparkles size={16} className="text-primary-light" /> Start Your Journey Today
            </span>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.2}>
            <h2 className="text-white font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-tight">
              Ready to Transform Your Skills?
            </h2>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.3}>
            <p className="text-white/80 font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              Join 50,000+ learners already growing their careers with expert-led courses. Get unlimited access to our entire library today.
            </p>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.4} className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link 
                href="/courses" 
                className="w-full sm:w-auto bg-white text-primary-dark font-bold rounded-2xl px-8 py-4 hover:bg-primary-light hover:text-primary-dark transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group"
              >
                Explore Courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/register" 
                className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center"
              >
                Sign Up for Free
              </Link>
            </div>
          </AnimatedReveal>

          {/* Trust Line */}
          <AnimatedReveal direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 mt-10 text-white/70 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-primary-light" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-primary-light" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-primary-light" />
                <span>30-day money-back</span>
              </div>
            </div>
          </AnimatedReveal>

        </div>
      </div>
    </section>
  );
}
