// Animation variant factories for sequential content entry animations

// When page content starts entering, timed to land just as the stair transition clears
export const ENTRY_DELAY = 0.6;

// Factory function for custom container variants
export const createContainerVariants = (stagger = 0.1, delay = ENTRY_DELAY) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    }
  }
});

// Factory function for custom item variants
export const createItemVariants = (y = 20, duration = 0.5) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: "easeOut" }
  }
});

// Reduced motion variants (accessibility)
export const reducedContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  }
};

export const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  }
};
