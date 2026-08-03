import React from 'react';
import { motion } from 'framer-motion';

// Variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

export const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

// Reusable Components
export const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } 
      }
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className = "" }) => (
  <motion.div
    variants={staggerContainerVariant}
    whileInView="visible"
    viewport={{ once: true, margin: "0px" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "", variant = fadeUpVariant, ...props }) => (
  <motion.div
    variants={variant}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const ScaleUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } 
      }
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className={className}
  >
    {children}
  </motion.div>
);
