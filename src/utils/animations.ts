import { Variants } from 'framer-motion';

// 🎭 SMOOTH EASING CURVES
export const easing = [0.25, 0.1, 0.25, 1]; // Cubic bezier - super smooth

// 🔥 CARD ANIMATIONS
export const cardVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  hover: { 
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: easing
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

// 📊 STAT CARD ANIMATIONS
export const statCardVariants: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easing
    }
  },
  hover: { 
    y: -6,
    scale: 1.01,
    boxShadow: '0 20px 40px rgba(27, 95, 86, 0.15)',
    transition: {
      duration: 0.2,
      ease: easing
    }
  }
};

// 📋 LIST ITEM ANIMATIONS
export const listItemVariants: Variants = {
  initial: { 
    opacity: 0, 
    x: -20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: easing
    }
  },
  hover: { 
    x: 4,
    backgroundColor: 'rgba(45, 154, 138, 0.05)',
    transition: {
      duration: 0.2
    }
  }
};

// 🌀 STAGGERED CONTAINER
export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: easing
    }
  }
};

// ✨ FADE IN UP
export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 30 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing
    }
  }
};

// 🎯 SCALE ON HOVER
export const scaleHover = {
  whileHover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.98 
  }
};

// 📅 SCHEDULE ITEM
export const scheduleItemVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 15,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easing
    }
  },
  hover: { 
    y: -2,
    scale: 1.01,
    transition: {
      duration: 0.2
    }
  }
};

// 🔔 ANNOUNCEMENT PULSE
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};