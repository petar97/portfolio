"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createItemVariants, reducedItemVariants } from "@/lib/animations";

const AnimatedItem = ({
  children,
  y = 12,
  duration = 0.25,
  as = "div",
  className = "",
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = prefersReducedMotion
    ? reducedItemVariants
    : createItemVariants(y, duration);

  const MotionComponent = motion[as];

  return (
    <MotionComponent variants={itemVariants} className={className} {...props}>
      {children}
    </MotionComponent>
  );
};

export default AnimatedItem;
