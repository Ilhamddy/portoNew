"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * FadeIn — reusable scroll-triggered animation wrapper.
 * Supports directional entry (up/down/left/right), delay, duration, and viewport margin.
 */
export default function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  viewportMargin = "-80px",
  as = "div",
  ...rest
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: viewportMargin });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
