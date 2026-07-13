"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import Link from "next/link";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* ----------------- SECTION 1: HERO ----------------- */}
      <section className="bg-gradient-to-br from-primary-light via-white to-primary-light/30 dark:from-[#0a0f1a] dark:via-[#1e293b] dark:to-primary-dark/20 py-20 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <AnimatedReveal direction="up" delay={0.1}>
            <span className="bg-primary-light dark:bg-primary/10 text-primary-dark dark:text-primary-light border border-secondary-lighter dark:border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 inline-block">
              📬 Get In Touch
            </span>
            <h1 className="text-secondary dark:text-surface font-heading font-extrabold text-4xl md:text-5xl tracking-tight mt-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-text-secondary dark:text-text-secondary/80 font-body leading-relaxed text-lg mt-6">
              Have a question, a suggestion, or just want to say hello? Our team is here and ready to help.
            </p>
          </AnimatedReveal>
        </div>
      </section>

      {/* ----------------- SECTION 2: CONTACT FORM & INFO ----------------- */}
      <section className="py-20 bg-white dark:bg-[#1e293b]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-3">
              <AnimatedReveal direction="right" delay={0.2}>
                <div className="bg-surface dark:bg-dark-bg border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-8 shadow-sm">
                  
                  {!isSuccess ? (
                    <>
                      <h2 className="text-secondary dark:text-surface font-heading font-semibold text-2xl mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-text-secondary dark:text-text-secondary/70 text-sm mb-8">
                        Fill out the form below and we will get back to you shortly.
                      </p>

                      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        
                        {/* Name */}
                        <div>
                          <label className="text-secondary dark:text-surface font-body font-medium text-sm mb-1.5 block">Full Name</label>
                          <input 
                            {...register("fullName")}
                            placeholder="John Doe"
                            className={`border ${errors.fullName ? 'border-red-500' : 'border-secondary-lighter dark:border-secondary/50'} focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary/50 rounded-xl px-4 py-2.5 w-full outline-none transition-shadow`}
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="text-secondary dark:text-surface font-body font-medium text-sm mb-1.5 block">Email Address</label>
                          <input 
                            {...register("email")}
                            type="email"
                            placeholder="john@example.com"
                            className={`border ${errors.email ? 'border-red-500' : 'border-secondary-lighter dark:border-secondary/50'} focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary/50 rounded-xl px-4 py-2.5 w-full outline-none transition-shadow`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="text-secondary dark:text-surface font-body font-medium text-sm mb-1.5 block">Subject</label>
                          <div className="relative">
                            <select 
                              {...register("subject")}
                              className={`border ${errors.subject ? 'border-red-500' : 'border-secondary-lighter dark:border-secondary/50'} focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface rounded-xl px-4 py-2.5 w-full outline-none transition-shadow appearance-none`}
                            >
                              <option value="">Select a subject...</option>
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="Course Support">Course Support</option>
                              <option value="Instructor Application">Instructor Application</option>
                              <option value="Technical Issue">Technical Issue</option>
                              <option value="Billing & Payment">Billing & Payment</option>
                              <option value="Partnership">Partnership</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                          </div>
                          {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject.message}</p>}
                        </div>

                        {/* Message */}
                        <div>
                          <label className="text-secondary dark:text-surface font-body font-medium text-sm mb-1.5 block">Message</label>
                          <textarea 
                            {...register("message")}
                            placeholder="Write your message here..."
                            rows={5}
                            className={`resize-none border ${errors.message ? 'border-red-500' : 'border-secondary-lighter dark:border-secondary/50'} focus-visible:ring-2 focus-visible:ring-primary bg-white dark:bg-[#1e293b] text-secondary dark:text-surface placeholder:text-text-secondary/50 rounded-xl px-4 py-3 w-full outline-none transition-shadow`}
                          />
                          {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
                        </div>

                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-2 bg-primary hover:bg-primary-hover active:bg-primary-dark text-white font-semibold rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin mr-2" size={18} />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="bg-primary-light/50 dark:bg-primary/10 border border-primary/20 rounded-3xl p-10 text-center flex flex-col items-center justify-center py-16">
                      <CheckCircle2 className="text-primary mb-4" size={56} />
                      <h3 className="text-secondary dark:text-surface font-heading font-bold text-3xl mt-2 mb-3">Message Sent!</h3>
                      <p className="text-text-secondary dark:text-text-secondary/80 text-base mb-8">
                        Thank you for reaching out! We've received your message and will get back to you within 24 hours.
                      </p>
                      <button 
                        onClick={() => { reset(); setIsSuccess(false); }}
                        className="border border-secondary-lighter dark:border-secondary/50 text-secondary dark:text-surface hover:bg-white dark:hover:bg-dark-bg hover:border-primary font-semibold rounded-xl px-6 py-2.5 transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </AnimatedReveal>
            </div>

            {/* RIGHT COLUMN: INFO */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              
              <AnimatedReveal direction="left" delay={0.3}>
                <div className="bg-surface dark:bg-dark-bg border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-6 flex items-start gap-4 hover:border-primary/40 transition-colors group">
                  <div className="bg-primary-light dark:bg-primary/20 rounded-2xl p-3 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Mail size={22} className="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-secondary dark:text-surface font-heading font-semibold text-base mb-1">Email Us</h3>
                    <p className="text-text-secondary dark:text-text-secondary/80 font-body text-sm leading-relaxed font-medium">support@learnhub.com</p>
                    <p className="text-text-secondary/70 dark:text-text-secondary/60 text-xs mt-0.5">We respond within 24 hours</p>
                  </div>
                </div>
              </AnimatedReveal>

              <AnimatedReveal direction="left" delay={0.4}>
                <div className="bg-surface dark:bg-dark-bg border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-6 flex items-start gap-4 hover:border-primary/40 transition-colors group">
                  <div className="bg-primary-light dark:bg-primary/20 rounded-2xl p-3 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Phone size={22} className="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-secondary dark:text-surface font-heading font-semibold text-base mb-1">Call Us</h3>
                    <p className="text-text-secondary dark:text-text-secondary/80 font-body text-sm leading-relaxed font-medium">+1 (800) 123-4567</p>
                    <p className="text-text-secondary/70 dark:text-text-secondary/60 text-xs mt-0.5">Mon–Fri, 9am–6pm EST</p>
                  </div>
                </div>
              </AnimatedReveal>

              <AnimatedReveal direction="left" delay={0.5}>
                <div className="bg-surface dark:bg-dark-bg border border-secondary-lighter dark:border-secondary/40 rounded-3xl p-6 flex items-start gap-4 hover:border-primary/40 transition-colors group">
                  <div className="bg-primary-light dark:bg-primary/20 rounded-2xl p-3 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <MapPin size={22} className="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-secondary dark:text-surface font-heading font-semibold text-base mb-1">Headquarters</h3>
                    <p className="text-text-secondary dark:text-text-secondary/80 font-body text-sm leading-relaxed font-medium">123 Learning Lane<br/>San Francisco, CA 94103</p>
                    <p className="text-text-secondary/70 dark:text-text-secondary/60 text-xs mt-0.5">United States</p>
                  </div>
                </div>
              </AnimatedReveal>

              {/* FAQ Quick Link */}
              <AnimatedReveal direction="left" delay={0.6}>
                <div className="bg-primary-light dark:bg-primary-darker/40 border border-secondary-lighter dark:border-primary-dark rounded-3xl p-6 mt-2">
                  <h4 className="text-secondary dark:text-surface font-heading font-semibold mb-1">Looking for quick answers?</h4>
                  <p className="text-text-secondary dark:text-text-secondary/80 text-sm mb-5">Check our FAQ section for instant answers.</p>
                  <Link href="/#faq" className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary/50 text-secondary dark:text-surface hover:border-primary hover:text-primary dark:hover:text-primary-light rounded-xl px-5 py-2.5 text-sm font-semibold transition-all inline-block">
                    View FAQ →
                  </Link>
                </div>
              </AnimatedReveal>

              {/* Socials */}
              <AnimatedReveal direction="left" delay={0.7}>
                <div className="mt-4 pl-2">
                  <p className="text-text-secondary dark:text-text-secondary/60 text-xs uppercase tracking-widest font-bold mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    {[FaTwitter, FaLinkedin, FaYoutube, FaInstagram].map((Icon, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary/40 hover:border-primary hover:bg-primary-light dark:hover:bg-primary/20 rounded-xl p-3 text-text-secondary hover:text-primary transition-all duration-300"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedReveal>

            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: MAP / OFFICE (OPTIONAL) ----------------- */}
      <section className="py-16 bg-surface dark:bg-dark-bg">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedReveal direction="up" delay={0.2}>
            <div className="text-center mb-10">
              <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-3xl mb-2">Find Us Here</h2>
              <p className="text-text-secondary dark:text-text-secondary/80 text-sm">Drop by our headquarters if you are in the area!</p>
            </div>
            
            <div className="relative w-full h-80 md:h-[28rem] bg-secondary-lighter/20 dark:bg-secondary/20 rounded-3xl overflow-hidden border border-secondary-lighter dark:border-secondary/30 shadow-md">
              {/* Maps Iframe representation */}
              <iframe 
                src="https://www.google.com/maps?q=San+Francisco,+CA&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 contrast-125 dark:opacity-70 dark:invert"
              />

              {/* Custom Pin Overlay */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white dark:bg-[#1e293b] border border-secondary-lighter dark:border-secondary/40 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-secondary dark:text-surface text-base">LearnHub HQ</h4>
                  <p className="text-text-secondary dark:text-text-secondary/70 text-xs font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

    </div>
  );
}
