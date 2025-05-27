"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionRevealCaseStudyProps {
  children: React.ReactNode;
  delay?: number;  // Main reveal delay
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Gradient shimmer keyframes
const shimmerKeyframes = {
  backgroundPosition: [
    "-250% 0%",
    "250% 100%",
  ],
};

export default function SectionRevealCaseStudy({
  children,
  delay = 0,
  className = "",
  as: Tag = "div"
}: SectionRevealCaseStudyProps) {
  // Ref for hover/tilt effect
  const ref = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  // Hover 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10; // left/right
    const rotateX = ((y / rect.height) - 0.5) * -10; // up/down
    setTilt({ x: rotateX, y: rotateY });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };
  const handleMouseEnter = () => setHovered(true);

  // Main motion variants
  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.97,
      y: 48,
      boxShadow: "0 18px 34px 0 rgba(0,22,40,0.10)",
      filter: "blur(12px)",
      rotateX: 12,
      rotateY: -15,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      boxShadow: [
        "0 18px 34px 0 rgba(0,22,40,0.10)",
        "0 14px 34px 0 rgba(0,35,75,0.19)",
        "0 6px 14px 0 rgba(42,150,216,0.13)"
      ],
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        mass: 1.1,
        stiffness: 74,
        damping: 18,
        delay: delay,
        boxShadow: { delay: delay + 0.05, duration: 0.7 },
        filter: { delay: delay + 0.07, duration: 0.5 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 24,
      filter: "blur(10px)",
      transition: { duration: 0.35 }
    },
  };

  // Glassmorphism layer
  const glassVariants = {
    initial: { opacity: 0, filter: "blur(16px) saturate(1.3)" },
    animate: { opacity: 1, filter: "blur(16px) saturate(1.8)", transition: { delay: delay+0.17, duration: 0.56 } }
  };

  // Shimmer effect
  const shimmerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.34, 0.10],
      transition: { delay: delay+0.22, duration: 1.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.7, repeatType: "loop" },
    }
  };

  // Halo border effect
  const borderVariants = {
    initial: { boxShadow: "0 0 0px 0px #00e5ff00" },
    animate: { boxShadow: "0 0 36px 7px #05e3fd55", transition: { delay: delay+0.22, duration: 0.68 } }
  };

  // Card tilt on hover (desktop)
  const interactiveStyle = hovered ? {
    rotateX: tilt.x,
    rotateY: tilt.y,
    transition: { type: "spring", stiffness: 180, damping: 18 },
  } : { rotateX: 0, rotateY: 0 };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={cardVariants}
        whileHover={interactiveStyle}
        transition={{ type: "spring", mass: 1.2, stiffness: 80, damping: 22 }}
        className={`relative group [perspective:1000px] overflow-visible ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ willChange: "transform, filter, box-shadow" }}
      >
        {/* Shimmer gradient sweep */}
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="pointer-events-none absolute inset-0 rounded-2xl z-10"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,246,248,.08) 17%, rgba(29,155,219,.28) 48%, rgba(18,224,255,0.10) 73%)",
            backgroundSize: "350% 350%",
            mixBlendMode: "lighten",
          }}
          animate={{ backgroundPosition: shimmerKeyframes.backgroundPosition }}
          transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        />
        {/* Glassmorphism overlay */}
        <motion.div
          variants={glassVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 z-5 rounded-2xl pointer-events-none"
          style={{
            background: "rgba(241,248,255,0.18)",
            boxShadow: "0 3px 36px 0 #33e2f8cc inset",
            backdropFilter: "blur(18px) saturate(1.7)",
            WebkitBackdropFilter: "blur(18px) saturate(1.7)",
            willChange: "opacity, filter, backdrop-filter",
          }}
        />
        {/* Animated glowing border/halo on reveal */}
        <motion.div
          variants={borderVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
          style={{ border: "2.5px solid #95effb66", borderRadius: "1.5rem" }}
        />
        {/* Content: Stagger nested children for even richer effect */}
        <Tag className="relative z-20 rounded-2xl overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0, transition: { delay: delay+0.26, duration: 0.85, type: "spring", stiffness: 52, damping: 18 } }}
            className="p-8 md:p-10 lg:p-12"
          >
            {children}
          </motion.div>
        </Tag>
      </motion.div>
    </AnimatePresence>
  );
}
