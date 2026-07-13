import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, BookOpen, Star, Target, Users, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export default function About() {
  return (
    <div className="flex flex-col w-full">
      
      {/* ----------------- SECTION 1: HERO ----------------- */}
      <section className="bg-gradient-to-br from-primary-light via-white to-primary-light/30 dark:from-[#0a0f1a] dark:via-[#1e293b] dark:to-primary-dark/20 py-24 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-light dark:bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-darker/20 dark:bg-primary-dark/40 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <AnimatedReveal direction="up" delay={0.1}>
            <span className="bg-primary-light dark:bg-primary/10 text-primary-dark dark:text-primary-light border border-secondary-lighter dark:border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 inline-block">
              🌍 About LearnHub
            </span>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.2}>
            <h1 className="text-secondary dark:text-surface font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Empowering Learners Around the World
            </h1>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.3}>
            <p className="text-text-secondary dark:text-text-secondary/80 font-body leading-relaxed text-lg max-w-xl mx-auto">
              We believe everyone deserves access to world-class education. LearnHub connects passionate learners with expert instructors to make that vision a reality.
            </p>
          </AnimatedReveal>

          <AnimatedReveal direction="up" delay={0.4}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-secondary dark:text-surface font-heading font-bold text-4xl mb-1">50K+</span>
                <span className="text-text-secondary dark:text-text-secondary/70 text-sm font-medium uppercase tracking-wider">Students</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-secondary dark:text-surface font-heading font-bold text-4xl mb-1">500+</span>
                <span className="text-text-secondary dark:text-text-secondary/70 text-sm font-medium uppercase tracking-wider">Courses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-secondary dark:text-surface font-heading font-bold text-4xl mb-1">200+</span>
                <span className="text-text-secondary dark:text-text-secondary/70 text-sm font-medium uppercase tracking-wider">Instructors</span>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      {/* ----------------- SECTION 2: OUR MISSION & STORY ----------------- */}
      <section className="py-24 bg-white dark:bg-[#1e293b]">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <AnimatedReveal direction="right" delay={0.1}>
              <span className="bg-primary-light dark:bg-primary/10 text-primary-dark dark:text-primary-light border border-secondary-lighter dark:border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 inline-block w-fit">
                🎯 Our Mission
              </span>
              <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-6">
                Education Should Be Accessible to Everyone
              </h2>
              
              <div className="flex flex-col gap-4 text-text-secondary dark:text-text-secondary/80 font-body leading-relaxed text-base md:text-lg mb-8">
                <p>LearnHub was founded with a simple but powerful belief — that knowledge should not be locked behind expensive institutions or geography.</p>
                <p>We built a platform where anyone can learn a new skill, advance their career, or pursue their passion — from anywhere in the world, at any pace.</p>
                <p>Today, over 50,000 students trust LearnHub to transform their learning journey with guidance from hand-vetted expert instructors.</p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  "Expert-verified instructors with real industry experience",
                  "Structured curriculum designed for real-world outcomes",
                  "Certificates recognized by leading companies"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-secondary dark:text-surface font-body text-sm md:text-base font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Column */}
          <div className="relative">
            <AnimatedReveal direction="left" delay={0.2}>
              <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-secondary-lighter dark:border-secondary/30 shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                  alt="Students collaborating" 
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-8 bg-white dark:bg-[#0f172a] border border-secondary-lighter dark:border-secondary/40 rounded-2xl p-4 md:p-5 shadow-xl flex items-center gap-4 animate-bounce-slow z-10">
                <div className="bg-primary-light/50 dark:bg-primary/20 p-3 rounded-full">
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary dark:text-surface font-heading font-bold text-lg md:text-xl">Trusted by</span>
                  <span className="text-text-secondary dark:text-text-secondary/80 text-sm font-medium">50,000+ Learners</span>
                </div>
              </div>
            </AnimatedReveal>
          </div>

        </div>
      </section>

      {/* ----------------- SECTION 3: CORE VALUES ----------------- */}
      <section className="py-24 bg-surface dark:bg-dark-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <AnimatedReveal direction="up" delay={0.1}>
              <span className="bg-primary-light dark:bg-primary/10 text-primary-dark dark:text-primary-light border border-secondary-lighter dark:border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 inline-block">
                Our Values
              </span>
              <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
                What Drives Everything We Do
              </h2>
              <p className="text-text-secondary dark:text-text-secondary/80 font-body text-lg leading-relaxed">
                These core principles guide our decisions, our product, and how we support our community every single day.
              </p>
            </AnimatedReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: BookOpen, title: "Accessible Learning", desc: "Quality education for everyone, everywhere. We break down barriers to learning." },
              { icon: Star, title: "Expert Quality", desc: "Every instructor is thoroughly vetted to ensure they bring real-world expertise." },
              { icon: Target, title: "Career Outcomes", desc: "We measure success by your growth and career advancement, not just course completion." },
              { icon: Users, title: "Community First", desc: "Learning is better together. We foster supportive Q&A, peer reviews, and networking." },
              { icon: Shield, title: "Trust & Safety", desc: "Secure payments, privacy-first infrastructure, and zero compromise on user data." },
              { icon: Zap, title: "Always Improving", desc: "We continuously ship updates and refine courses based on direct student feedback." }
            ].map((value, i) => (
              <AnimatedReveal key={i} direction="up" delay={0.2 + (i * 0.1)}>
                <div className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-8 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="bg-primary-light dark:bg-primary/20 rounded-2xl p-4 inline-flex mb-6">
                    <value.icon size={26} className="text-primary" />
                  </div>
                  <h3 className="text-secondary dark:text-surface font-heading font-bold text-xl mb-3">{value.title}</h3>
                  <p className="text-text-secondary dark:text-text-secondary/80 font-body leading-relaxed text-sm md:text-base">
                    {value.desc}
                  </p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 4: MEET THE TEAM ----------------- */}
      <section className="py-24 bg-white dark:bg-[#1e293b]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <AnimatedReveal direction="up" delay={0.1}>
              <span className="bg-primary-light dark:bg-primary/10 text-primary-dark dark:text-primary-light border border-secondary-lighter dark:border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 inline-block">
                👥 Our Team
              </span>
              <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
                The People Behind LearnHub
              </h2>
              <p className="text-text-secondary dark:text-text-secondary/80 font-body text-lg leading-relaxed">
                A passionate group of educators, engineers, and designers dedicated to building the future of online learning.
              </p>
            </AnimatedReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { name: "Sarah Jenkins", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&auto=format&fit=crop", bio: "Former university professor turned ed-tech entrepreneur. Passionate about scaling education." },
              { name: "David Chen", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&auto=format&fit=crop", bio: "10+ years building scalable platforms. Loves open-source and mentoring junior devs." },
              { name: "Elena Rodriguez", role: "Chief Learning Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&auto=format&fit=crop", bio: "PhD in Cognitive Science. Ensures our courses use the latest in learning methodologies." },
              { name: "Marcus Johnson", role: "Design Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&auto=format&fit=crop", bio: "Obsessed with creating intuitive, beautiful, and accessible user interfaces for all." }
            ].map((member, i) => (
              <AnimatedReveal key={i} direction="up" delay={0.2 + (i * 0.1)}>
                <div className="bg-surface dark:bg-dark-bg border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-6 text-center hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-primary-light dark:border-primary/30 mb-5 group-hover:border-primary transition-colors duration-300 shadow-md">
                    <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-secondary dark:text-surface font-heading font-bold text-xl">{member.name}</h3>
                  <span className="bg-primary-light dark:bg-primary/20 text-primary-dark dark:text-primary-light border border-secondary-lighter/50 dark:border-primary/20 rounded-full px-3 py-1 text-xs font-semibold mt-2 inline-block mx-auto w-fit">
                    {member.role}
                  </span>
                  <p className="text-text-secondary dark:text-text-secondary/80 font-body text-sm leading-relaxed mt-4 flex-grow">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-4 mt-6 pt-5 border-t border-secondary-lighter dark:border-secondary/30">
                    <a href="#" className="text-text-secondary dark:text-text-secondary/60 hover:text-primary dark:hover:text-primary transition-colors"><FaLinkedin size={18} /></a>
                    <a href="#" className="text-text-secondary dark:text-text-secondary/60 hover:text-primary dark:hover:text-primary transition-colors"><FaTwitter size={18} /></a>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: CTA BANNER ----------------- */}
      <section className="relative overflow-hidden bg-primary-dark dark:bg-[#0a0f1a] py-24">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-light/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" style={{ backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <AnimatedReveal direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 rounded-full px-5 py-2 text-sm font-semibold mb-8 backdrop-blur-md">
              <Sparkles size={16} className="text-primary-light" /> Ready to begin?
            </span>
            <h2 className="text-white font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-tight">
              Start Your Learning Journey Today
            </h2>
            <p className="text-white/80 font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Join thousands of students already building their future with LearnHub. The time to invest in yourself is now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses" className="w-full sm:w-auto bg-white text-primary-dark font-bold rounded-2xl px-8 py-4 hover:bg-primary-light hover:text-primary-dark transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group">
                Browse Courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/instructor" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center">
                Become an Instructor
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </section>

    </div>
  );
}
