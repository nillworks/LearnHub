"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedStat({ value, suffix = "", decimals = 0, className = "" }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  
  const motionValue = useMotionValue(0);
  
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  const display = useTransform(springValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals) + suffix;
    }
    return Math.round(latest) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
