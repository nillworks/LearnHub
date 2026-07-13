"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedReveal({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: AnimatedRevealProps) {
  
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Smooth custom easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
