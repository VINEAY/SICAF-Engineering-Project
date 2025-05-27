import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface SectionTransitionProps {
  direction?: "up" | "down";
  color?: string;
  className?: string;
}

/**
 * Section transition sweep animation. Subtle moving SVG stripe effect + geometric circuit accent.
 * Defaults: vertical, blue/teal, reveal on scroll.
 */
export default function SectionTransition({
  direction = "up",
  color = "#00C6D8",
  className = "",
}: SectionTransitionProps) {
  // Play animation on in-view
  const ref = React.useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { margin: "-24% 0px -24% 0px", once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={
        `relative w-full flex justify-center items-center py-6 overflow-visible ${className}`
      }
      initial="hidden"
      animate={controls}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, scaleY: 0.6 },
          visible: {
            opacity: 0.8,
            scaleY: 1,
            transition: { duration: 1.1, ease: "anticipate" },
          },
        }}
        style={{ background: `linear-gradient(90deg, rgba(0,198,216,0.18) 0%, rgba(0,30,70,0.05) 60%, rgba(255,255,255,0.06) 100%)` }}
      />
      <motion.svg
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            scaleY: direction === "down" ? 0.6 : 0.6,
            y: direction === "down" ? -100 : 100,
            x: 0,
          },
          visible: {
            opacity: 1,
            scaleY: 1,
            y: 0,
            transition: {
              duration: 1.1,
              type: "spring",
              stiffness: 60,
              damping: 18,
            },
          },
        }}
        width="96" height="90" viewBox="0 0 96 90" fill="none"
        className="mx-auto block drop-shadow-lg pointer-events-none"
        style={{ filter: `blur(0.2px)`, minHeight: 96, display: 'block' }}
      >
        <g>
          {/* Energetic vertical streak */}
          <rect x="43" y="10" width="10" height="70" rx="5" fill={color} opacity="0.24" />
          <rect x="47.5" y="5" width="3" height="80" rx="1.5" fill={color} opacity="0.48" />
          <rect x="39.5" y="32" width="4" height="38" rx="2" fill="#0099aa" opacity="0.12" />
          {/* Modern circuit/geometric accent */}
          <circle cx="48" cy="19.5" r="3.5" fill={color} opacity="0.45" />
          <circle cx="48" cy="71.5" r="5.5" fill={color} opacity="0.22" />
          <rect x="42" y="44" width="12" height="5" rx="2.5" fill="#92F1FC" opacity="0.20" />
          {/* Dashed line accent */}
          <line x1="8" y1="45" x2="88" y2="45" stroke={color} strokeWidth="2" strokeDasharray="5 5" opacity="0.13" />
        </g>
      </motion.svg>
    </motion.div>
  );
}
