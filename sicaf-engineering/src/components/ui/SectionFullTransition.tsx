"use client"
import React, { createContext, useContext, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface SectionFullTransitionContextProps {
  trigger: () => void;
}
const SectionFullTransitionContext = createContext<SectionFullTransitionContextProps | undefined>(undefined);

export function useSectionFullTransition() {
  const ctx = useContext(SectionFullTransitionContext);
  if (!ctx) throw new Error("SectionFullTransitionProvider missing");
  return ctx;
}

export function SectionFullTransitionProvider({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const timeout = useRef<any>();

  // Show transition for 900ms on trigger
  const trigger = React.useCallback(() => {
    controls.start("cover");
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      controls.start("uncover");
    }, 650); // hold cover for .65s
  }, [controls]);

  return (
    <SectionFullTransitionContext.Provider value={{ trigger }}>
      {/* Full screen animated overlay */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial="uncover"
        animate={controls}
        variants={{
          uncover: { scaleY: 0, opacity: 0, transition: { duration: 0.57, ease: "circOut" } },
          cover: {
            scaleY: 1,
            opacity: 1,
            transition: { duration: 0.66, ease: "circInOut" },
          }
        }}
        style={{
          originY: 0,
          scaleX: 1,
        }}
      >
        {/* Blue/teal gradient with geometric circuit accent */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(120deg, #00c6d8 0%, #00333f 100%)",
          opacity: 0.97
        }}/>
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', opacity: 0.10 }}>
          {/* Circuit/geom accents */}
          <g>
            <path d="M300 0L1620 1080" stroke="#11FFFDE8" strokeWidth="8" strokeDasharray="90 30" />
            <rect x="920" y="480" width="80" height="80" rx="22" fill="#00D4FC" opacity="0.18" />
            <ellipse cx="480" cy="540" rx="55" ry="190" fill="#ffffff" opacity="0.04" />
            <ellipse cx="1440" cy="640" rx="35" ry="190" fill="#ffffff" opacity="0.07" />
          </g>
        </svg>
      </motion.div>
      {children}
    </SectionFullTransitionContext.Provider>
  );
}
