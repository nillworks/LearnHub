import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-[#0a0f1a] pt-20 pb-8 border-t border-secondary-lighter dark:border-secondary/30 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <AnimatedReveal direction="up" delay={0.1}>
              <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex w-fit">
                <div className="bg-primary group-hover:bg-primary-hover rounded-xl p-2 transition-colors">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <span className="text-secondary dark:text-white font-heading font-extrabold text-2xl tracking-tight">
                  LearnHub<span className="text-primary">.</span>
                </span>
              </Link>
              
              <p className="text-text-secondary dark:text-secondary-lighter/80 text-sm leading-relaxed max-w-xs mb-8">
                Empowering global learners with expert-led courses. Transform your career with high-quality, accessible education tailored for you.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[
                  { icon: FaFacebook, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: FaLinkedin, href: "#" },
                  { icon: FaYoutube, href: "#" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="bg-secondary-lighter/30 dark:bg-primary-dark hover:bg-primary dark:hover:bg-primary text-secondary dark:text-secondary-lighter hover:text-white dark:hover:text-white rounded-xl p-2.5 transition-all duration-300"
                    aria-label="Social Link"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </AnimatedReveal>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <AnimatedReveal direction="up" delay={0.2}>
              <h4 className="text-secondary dark:text-white font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-4">
                {["Home", "All Courses", "About Us", "Contact", "Blog"].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-text-secondary dark:text-secondary-lighter hover:text-primary dark:hover:text-primary-light text-sm font-medium transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedReveal>
          </div>

          {/* Column 3: Categories */}
          <div className="flex flex-col">
            <AnimatedReveal direction="up" delay={0.3}>
              <h4 className="text-secondary dark:text-white font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Top Categories
              </h4>
              <ul className="flex flex-col gap-4">
                {["Web Development", "Data Science", "UI/UX Design", "Digital Marketing", "Business", "Photography"].map((category, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-text-secondary dark:text-secondary-lighter hover:text-primary dark:hover:text-primary-light text-sm font-medium transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedReveal>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <AnimatedReveal direction="up" delay={0.4}>
              <h4 className="text-secondary dark:text-white font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <span className="text-text-secondary dark:text-secondary-lighter group-hover:text-primary dark:group-hover:text-primary-light text-sm font-medium transition-colors">
                    support@learnhub.com
                  </span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <span className="text-text-secondary dark:text-secondary-lighter group-hover:text-primary dark:group-hover:text-primary-light text-sm font-medium transition-colors">
                    +1 (555) 123-4567
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <span className="text-text-secondary dark:text-secondary-lighter text-sm font-medium leading-relaxed">
                    123 Learning Street, Tech Valley<br />
                    San Francisco, CA 94107
                  </span>
                </li>
              </ul>
            </AnimatedReveal>
          </div>
          
        </div>

        {/* Newsletter Row */}
        <AnimatedReveal direction="up" delay={0.5}>
          <div className="mt-16 bg-white dark:bg-primary-dark/40 border border-secondary-lighter dark:border-primary-dark rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-center md:text-left">
              <h4 className="text-secondary dark:text-white font-heading font-bold text-lg mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-text-secondary dark:text-secondary-lighter text-sm">
                Get the latest updates, new courses, and special offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-72 bg-surface dark:bg-[#0a0f1a] border border-secondary-lighter dark:border-secondary/50 rounded-xl px-4 py-3 text-secondary dark:text-white placeholder:text-text-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
              <button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-3 text-sm font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </AnimatedReveal>

        {/* Bottom Divider */}
        <div className="border-t border-secondary-lighter dark:border-secondary/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary dark:text-secondary-lighter/80 text-sm font-medium text-center md:text-left">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-text-secondary dark:text-secondary-lighter/80 hover:text-primary dark:hover:text-primary-light text-sm font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-text-secondary dark:text-secondary-lighter/80 hover:text-primary dark:hover:text-primary-light text-sm font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
