"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * TextReveal — Clip-mask reveal animation for headings.
 * Each line slides up from behind a mask for a cinematic effect.
 */
export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
  as = "div",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const MotionTag = motion[as] || motion.div;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <MotionTag
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </MotionTag>
    </div>
  );
}
