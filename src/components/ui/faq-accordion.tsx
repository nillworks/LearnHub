"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border border-secondary-lighter dark:border-secondary/30 rounded-2xl overflow-hidden transition-colors duration-300 ${
              isOpen ? "bg-surface dark:bg-[#0f172a]" : "bg-white dark:bg-[#1e293b]"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className={`font-heading font-bold text-lg transition-colors duration-300 ${isOpen ? "text-primary dark:text-primary-light" : "text-secondary dark:text-surface"}`}>
                {faq.question}
              </span>
              <div className={`shrink-0 ml-4 p-2 rounded-full transition-transform duration-300 ${isOpen ? "bg-primary-light/50 dark:bg-primary/20 rotate-180" : "bg-secondary-lighter/30 dark:bg-secondary/30"}`}>
                <ChevronDown size={20} className={isOpen ? "text-primary" : "text-text-secondary"} />
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-text-secondary dark:text-text-secondary/80 font-body leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
