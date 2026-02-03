// Animation variant factories for sequential content entry animations

// Default container variants with staggerChildren
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 2.4,
    }
  }
};

// Default item variants with fade and slide-up
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Factory function for custom container variants
export const createContainerVariants = (stagger = 0.1, delay = 2.4) => ({
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
