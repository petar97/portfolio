"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createContainerVariants, reducedContainerVariants, ENTRY_DELAY } from "@/lib/animations";

const AnimatedSection = ({
  children,
  stagger = 0.1,
  delay = ENTRY_DELAY,
  className = "",
  as = "div",
}) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? reducedContainerVariants
    : createContainerVariants(stagger, delay);

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedSection;
