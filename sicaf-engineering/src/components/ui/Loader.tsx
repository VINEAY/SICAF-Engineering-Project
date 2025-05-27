"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo";

export default function Loader({ isLoaded }: { isLoaded: boolean }) {
  // Animate a number progress from 1 to 100
  const [progress, setProgress] = React.useState(1);
  const [done, setDone] = React.useState(false);
  const [playWow, setPlayWow] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      setProgress(100);
      setPlayWow(true);
      setTimeout(() => setDone(true), 1800);
      return;
    }
    let raf: number;
    function animate() {
      setProgress((prev) => {
        if (prev < 99.5) {
          return prev + Math.max(0.10, (102 - prev) * 0.009);
        }
        return prev;
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isLoaded]);

  React.useEffect(() => {
    if (progress >= 100 && !done && playWow) {
      setTimeout(() => setDone(true), 600);
    }
  }, [progress, playWow, done]);

  // Logo animation
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: [0.9, 1.03, 1],
      opacity: 1,
      transition: {
        duration: 1.8,
        delay: 0.3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader-bg"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#00778D] via-[#003847] to-[#001e2e] text-white w-screen h-screen overflow-hidden"
          initial="initial"
          exit="exit"
          variants={containerVariants}
        >
          {/* Logo animation */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="mb-6"
          >
            <Logo className="text-white" isInverted />
          </motion.div>

          {/* Tagline text */}
          <motion.div
            className="tracking-widest text-base font-semibold text-white/90"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Engineering Excellence
          </motion.div>

          {/* --- Bottom section --- */}
          <div className="absolute left-0 right-0 flex flex-col items-center bottom-8">
            {/* Percentage counter above text */}
            <motion.div
              className="text-3xl md:text-4xl font-bold text-[#eaffc0] mb-2 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              style={{ letterSpacing: "0.07em" }}
            >
              {Math.floor(progress)}%
            </motion.div>
            {/* Subtext */}
            <motion.div
              className="uppercase tracking-[0.25em] mb-2 text-xs text-white/80 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.6 }}
            >
              - FOR SUSTAINABLE PARTNERSHIP -
            </motion.div>
            <motion.div
              className="text-sm text-white/80 text-center font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.45, duration: 0.6 }}
            >
              LOADING TRUST RELATIONSHIP IN PROGRESS...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
