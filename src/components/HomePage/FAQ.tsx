import React from "react";
import Link from "next/link";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { FAQAccordion } from "@/components/ui/faq-accordion";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "Simply browse our catalog, select the course you are interested in, and click the 'Enroll Now' button. You can pay securely via Stripe, and you will get instant access to the materials.",
  },
  {
    question: "Can I get a refund after purchasing?",
    answer: "Yes! We offer a 30-day money-back guarantee if you are not satisfied with the course content. No questions asked.",
  },
  {
    question: "How do I become an instructor?",
    answer: "You can apply to become an instructor by visiting our 'Become an Instructor' page and submitting your portfolio and credentials for review by our team.",
  },
  {
    question: "Are certificates recognized by employers?",
    answer: "Absolutely. Our certificates are verifiable and widely recognized by top employers in the tech and business industries.",
  },
  {
    question: "Can I download course videos?",
    answer: "Yes, you can download course videos on our mobile app for offline viewing, so you can learn anywhere, even without internet access.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards, PayPal, Google Pay, and Apple Pay through our secure Stripe payment gateway.",
  }
];

export default function FAQ() {
  return (
    <section className="py-24 bg-white dark:bg-[#1e293b] relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-light/40 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">
            <AnimatedReveal direction="up" delay={0.1}>
              <span className="text-primary-dark dark:text-primary-light font-bold tracking-widest text-sm mb-4 inline-block uppercase bg-primary-light/50 dark:bg-primary/10 px-4 py-1.5 rounded-full">
                Got Questions?
              </span>
            </AnimatedReveal>
            
            <AnimatedReveal direction="up" delay={0.2}>
              <h2 className="text-secondary dark:text-surface font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-6 leading-[1.1]">
                Frequently Asked Questions
              </h2>
            </AnimatedReveal>
            
            <AnimatedReveal direction="up" delay={0.3}>
              <p className="text-text-secondary dark:text-text-secondary/80 font-body text-lg leading-relaxed mb-8">
                Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
            </AnimatedReveal>
            
            <AnimatedReveal direction="up" delay={0.4}>
              <Link 
                href="/contact" 
                className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 inline-flex items-center justify-center"
              >
                Contact Support
              </Link>
            </AnimatedReveal>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 w-full">
            <AnimatedReveal direction="up" delay={0.2}>
              <FAQAccordion faqs={faqs} />
            </AnimatedReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
