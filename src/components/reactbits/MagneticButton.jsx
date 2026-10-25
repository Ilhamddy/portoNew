"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticButton — Adds a subtle magnetic pull effect on hover.
 * Wraps children and applies a transform toward the cursor.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "div",
  ...rest
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.1 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
