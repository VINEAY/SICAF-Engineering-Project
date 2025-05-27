import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

export type RevealMode = 1 | 2 | 3 | 4 | 5;

/**
 * SectionReveal fuses 5 motion-inspired animations: diagonal mask, sliced slide, parallax-fade-scale,
 * gradient sweep, and 3D perspective tilt.
 * Each section, on in-view, randomly or sequentially chooses one based on the mode prop.
 */
export default function SectionReveal({
  children,
  mode,
  className = "",
  disableAnimation = false
}: {
  children: React.ReactNode;
  mode?: RevealMode;
  className?: string;
  disableAnimation?: boolean;
}) {
  // Random/cycle selection on mount
  const prevModeRef = useRef<RevealMode | null>(null);
  const [randMode] = useState<RevealMode>(() => {
    if (mode) return mode;
    let newMode: RevealMode;
    do {
      newMode = (Math.floor(Math.random() * 5) + 1) as RevealMode;
    } while (prevModeRef.current !== null && newMode === prevModeRef.current);
    prevModeRef.current = newMode;
    return newMode;
  });

  // Mouse interaction values for hover effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  const brightness = useTransform(mouseY, [-300, 300], [1.1, 0.9]);
  const ref = useRef<HTMLDivElement>(null);
  // Reduced margin for earlier detection and smoother animation
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.5 });

  // Improved mobile and reduced motion detection
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    checkMobile();
    checkReducedMotion();
    window.addEventListener('resize', checkMobile);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', checkReducedMotion);
    return () => {
      window.removeEventListener('resize', checkMobile);
      mq.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Anim 1: Diagonal Mask Sweep
  const renderMaskSweep = () => (
    <motion.div
      initial={{ x: "-100%", rotate: -8, opacity: 0, skewY: -12 }}
      animate={inView ? { x: "100%", opacity: [1, 0.35, 0], transition: { duration: 0.9 } } : { x: "-100%", opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform, opacity"
      }}
      aria-hidden
    >
      <svg width="100%" height="100%" viewBox="0 0 1920 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "100%", width: "100%", display: "block" }}>
        <linearGradient id="sweep" x1="0" y1="0" x2="1920" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00c6d8" stopOpacity="0.92" />
          <stop offset="1" stopColor="#00F6ED" stopOpacity="0.67" />
        </linearGradient>
        <polygon
          points="0,0 1920,0 1920,350 0,310"
          fill="url(#sweep)"
          opacity={0.92}
        />
      </svg>
    </motion.div>
  );

  // Anim 2: Sliced Split Reveal
  const renderSplitReveal = () => (
    <>
      <motion.div
        initial={{ x: 0 }}
        animate={inView ? { x: "-102%", transition: { delay: 0.02, duration: 0.5, ease: "easeInOut" } } : { x: 0 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "51%",
          height: "100%",
          background: "#effbfc",
          zIndex: 103,
          borderTopRightRadius: 48,
          borderBottomRightRadius: 64,
          willChange: "transform"
        }}
        aria-hidden
      />
      <motion.div
        initial={{ x: 0 }}
        animate={inView ? { x: "102%", transition: { delay: 0.03, duration: 0.5, ease: "easeInOut" } } : { x: 0 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "49%",
          height: "100%",
          background: "#e8f6f7",
          zIndex: 102,
          borderTopLeftRadius: 44,
          borderBottomLeftRadius: 42,
          willChange: "transform"
        }}
        aria-hidden
      />
    </>
  );

  // Anim 3: Parallax Fade + Scale + Pattern dot overlay
  const renderParallaxFade = () => (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: [0.75, 1], transition: { duration: 0.85 } } : { scale: 0.98, opacity: 0 }}
      transition={{ ease: "circOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 105,
        pointerEvents: "none",
        willChange: "transform, opacity"
      }}
      aria-hidden
    >
      <svg width="100%" height="100%" viewBox="0 0 420 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.24, mixBlendMode: "luminosity", width: "100%", height: "100%" }}>
        <g>
          {Array.from({ length: 21 * 3 }).map((_, i) => (
            <circle
              key={i}
              cx={16 + (i % 21) * 20}
              cy={10 + Math.floor(i / 21) * 25}
              r="2.2"
              fill="#00b7d6"
              opacity="0.3"
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );

  // Animation disabled: render children only
  if (disableAnimation || prefersReducedMotion) {
    return (
      <section ref={ref} className={"relative w-full " + className} style={{ minHeight: 1, zIndex: 1 }}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className={"relative w-full overflow-visible " + className}
      style={{
        minHeight: 1,
        willChange: "transform, opacity",
        zIndex: 101,
        isolation: "isolate"
      }}
    >
      {/* Animated overlays (absolute, over content) */}
      {randMode === 1 && renderMaskSweep()}
      {randMode === 2 && renderSplitReveal()}
      {randMode === 3 && renderParallaxFade()}
      {randMode === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{ willChange: "transform, opacity", zIndex: 104 }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 mix-blend-overlay animate-gradient-shift" />
        </motion.div>
      )}
      {randMode === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            rotateX,
            rotateY,
            filter: `brightness(${brightness})`,
            perspective: 1000,
            willChange: "transform",
            zIndex: 104
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
          }}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
          className="absolute inset-0 transition-all duration-200 ease-out pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 mix-blend-overlay" />
        </motion.div>
      )}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } }
        }}
        style={{
          position: "relative",
          zIndex: 110,
          overflow: "visible"
        }}
      >
        {React.Children.map(children, (child, i) => {
          const yOffset = isMobile ? 25 : 30;
          return (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: isMobile ? 0.5 : 0.55,
                    ease: "easeOut"
                  }
                }
              }}
              transition={{ delay: 0.06 * i }}
              key={i}
              style={{ willChange: "transform, opacity" }}
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
