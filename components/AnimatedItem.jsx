"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createItemVariants, reducedItemVariants } from "@/lib/animations";

const AnimatedItem = ({
  children,
  y = 20,
  duration = 0.5,
  as = "div",
  className = "",
}) => {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = prefersReducedMotion
    ? reducedItemVariants
    : createItemVariants(y, duration);

  const MotionComponent = motion[as];

  return (
    <MotionComponent variants={itemVariants} className={className}>
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
