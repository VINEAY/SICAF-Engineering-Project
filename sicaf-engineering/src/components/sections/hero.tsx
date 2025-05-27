"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import SplitText from "@/components/ui/SplitText";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  // Parallax for the overlay grid
  const fgY = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background elements with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50 z-10" />
        <Image
          src="/hero-bg.jpg"
          alt="Industrial background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Parallaxed SVG overlay - subtle engineering grid/circle pattern */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none"
        aria-hidden
        style={{ y: fgY }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 780"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <g opacity="0.14">
            {/* Dotted grid */}
            {Array.from({ length: 19 }).map((_, y) => (
              <g key={y}>
                {Array.from({ length: 32 }).map((_, x) => (
                  <circle key={`${x}-${y}`} cx={45 + x * 45} cy={45 + y * 38} r="2.2" fill="#00778D" />
                ))}
              </g>
            ))}
            {/* Large faint coordinates lines diagonals */}
            <line x1="100" y1="100" x2="1340" y2="680" stroke="#0099AA" strokeWidth="2.1" opacity="0.23" />
            <line x1="1375" y1="100" x2="50" y2="680" stroke="#00778D" strokeWidth="1.5" opacity="0.11" />
            {/* Centerpiece geometric accent (abstract gear/arches) */}
            <ellipse cx="725" cy="350" rx="180" ry="110" stroke="#008BA8" strokeWidth="2.5" opacity="0.2" />
            <ellipse cx="725" cy="350" rx="90" ry="52" stroke="#00F6ED" strokeWidth="1.3" opacity="0.14" />
          </g>
        </svg>
      </motion.div>

      <div className="container relative z-10 mt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Animated headline */}
          <div className="overflow-hidden mb-4">
            <h1 className="text-white font-bold mb-6">
              <SplitText
                text="Engineering Excellence for Industrial Transformation"
                as="span"
                effect="slide"
                className="block"
                textClassName="inline-block"
              />
            </h1>
          </div>

          {/* Animated subheadline */}
          <div>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl">
              <SplitText
                text="Unlock your organization's full potential with SICAF Engineering's expert consulting, engineering, and training solutions."
                as="span"
                effect="slide"
                stagger={0.02}
                className="block"
                textClassName="inline-block mr-1"
              />
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white magnetic-button"
              >
                Discover Our Services
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 magnetic-button"
              >
                Contact Us Today
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <p className="text-white/60 text-sm mb-2">Scroll to discover</p>
          <div className="w-0.5 h-8 bg-white/30 relative overflow-hidden">
            <motion.div
              className="w-full h-full bg-white"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
