"use client";
import { type ReactNode, useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

// Enhanced: allow directionX/Y, magnitude, etc.
type AnimationDirection = "up" | "down" | "left" | "right" | "none";
type AnimationVariants = Record<string, Variant>;

interface AnimatedScrollProps {
  children: ReactNode;
  directionX?: AnimationDirection;
  directionY?: AnimationDirection;
  magnitude?: number; // px, default 48
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  style?: React.CSSProperties;
  variants?: AnimationVariants;
  animate?: string;
  initial?: string;
  staggerIndex?: number;
  staggerDelay?: number;
}

/**
 * Component that animates its children when they enter the viewport
 */
export function AnimatedScroll({
  children,
  directionX = "none",
  directionY = "up",
  magnitude = 48,
  duration = 0.72,
  delay = 0,
  threshold = 0.16,
  className = "",
  once = true,
  style = {},
  variants,
  animate = "visible",
  initial = "hidden",
  staggerIndex = 0,
  staggerDelay = 0.1,
}: AnimatedScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  // Calculate offset for entry
  const xOffset =
    directionX === "right"
      ? magnitude
      : directionX === "left"
      ? -magnitude
      : 0;
  const yOffset =
    directionY === "up"
      ? magnitude
      : directionY === "down"
      ? -magnitude
      : 0;
  // Enhanced: Default variants use both X, Y, opacity
  const defaultVariants: AnimationVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay: delay + staggerIndex * staggerDelay,
        ease: [0.25, 1, 0.35, 1],
      },
    },
  };
  const animationVariants = variants || defaultVariants;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      variants={animationVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container with axis/direction/delay options
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  className = "",
  threshold = 0.1,
  once = true,
  delayChildren = 0.08,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  delayChildren?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
        ease: [0.2, 0.7, 0.44, 1]
      },
    },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedText (deprecated, recommend new SplitText)
 */
export function AnimatedText({
  text,
  type = "words",
  className = "",
  textClassName = "",
  duration = 0.5,
  delay = 0,
  staggerDelay = 0.02,
  threshold = 0.2,
  once = true,
}: {
  text: string;
  type?: "words" | "chars";
  className?: string;
  textClassName?: string;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: "easeOut" },
    },
  };
  const items = type === "words" ? text.split(" ") : text.split("");
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <motion.span
            key={`${item}-${index}`}
            variants={childVariants}
            className={textClassName}
            style={{ display: "inline-block" }}
          >
            {item}
            {type === "words" && index < items.length - 1 && " "}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
