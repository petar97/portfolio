// Animation variant factories for sequential content entry animations

// When page content starts entering after navigation (no overlay to wait for)
export const ENTRY_DELAY = 0;

// Page-level fade-in: short and ease-out, so navigation feels immediate
export const PAGE_FADE = { delay: ENTRY_DELAY, duration: 0.25, ease: "easeOut" };

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
export const createItemVariants = (y = 12, duration = 0.25) => ({
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
