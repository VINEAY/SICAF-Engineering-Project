"use client";

import * as React from "react";
import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import Image from "next/image";

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage?: string;
  overlayColor?: string;
  overlayGradient?: boolean;
  overlayGradientColors?: [string, string];
  overlayGradientDirection?: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl";
  overlayOpacity?: number;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  className?: string;
  bgImageAlt?: string;
  priority?: boolean;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  quality?: number;
  disableParallax?: boolean;
  hoverEffect?: "zoom" | "brighten" | "none";
}

/**
 * A reusable parallax section component that creates a scrolling effect
 * with customizable direction and speed
 */
export const ParallaxSection = React.forwardRef<HTMLDivElement, ParallaxSectionProps>(
  ({
    children,
    bgImage,
    overlayColor = "rgba(0, 0, 0, 0.5)",
    overlayGradient = false,
    overlayGradientColors = ["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.3)"],
    overlayGradientDirection = "to-b",
    overlayOpacity = 1,
    direction = "up",
    speed = 0.2,
    className = "",
    bgImageAlt = "Background image",
    priority = false,
    easing = "linear",
    quality = 90,
    disableParallax = false,
    hoverEffect = "none",
  }, ref) => {
    const sectionRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => sectionRef.current as HTMLDivElement);

    // Check if we're on a mobile device or if user prefers reduced motion
    const [isMobile, setIsMobile] = React.useState(false);
    const [disableParallaxTemp, setDisableParallaxTemp] = React.useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    // Generate better blur placeholder based on image path
    const getOptimizedBlurData = (imagePath?: string) => {
      if (!imagePath) return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI/+tkfOwAAAABJRU5ErkJggg==";

      // Extract color hints from image path if possible
      const isLight = imagePath.includes('light') || imagePath.includes('white');
      const isDark = imagePath.includes('dark') || imagePath.includes('black');

      if (isLight) {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="; // Light blur
      } else if (isDark) {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg=="; // Dark blur
      }

      // Default neutral blur
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmM9QDwAECQGAZalTpgAAAABJRU5ErkJggg==";
    };

    React.useEffect(() => {
      // Detect mobile devices and reduce parallax intensity
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Check if user prefers reduced motion
      const checkReducedMotion = () => {
        if (typeof window !== 'undefined') {
          setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        }
      };

      checkMobile();
      checkReducedMotion();

      window.addEventListener('resize', checkMobile);

      // Listen for changes in motion preference
      const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionMediaQuery.addEventListener('change', checkReducedMotion);

      // Performance monitoring
      let observer: PerformanceObserver | null = null;
      if (sectionRef.current && typeof PerformanceObserver !== 'undefined') {
        observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // If we detect jank, disable parallax temporarily
            if (entry.entryType === 'layout-shift' && (entry as any).value > 0.05) {
              setDisableParallaxTemp(true);
              // Re-enable after a short delay
              setTimeout(() => setDisableParallaxTemp(false), 800);
            }
          }
        });

        // Observe layout shifts
        observer.observe({ entryTypes: ['layout-shift'] });
      }

      // Single cleanup function
      return () => {
        if (observer) observer.disconnect();
        window.removeEventListener('resize', checkMobile);

        // Clean up motion preference listener
        const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionMediaQuery.removeEventListener('change', checkReducedMotion);
      };
    }, []);

    // Adjust speed based on device type
    const effectiveSpeed = isMobile ? Math.min(speed * 0.6, 0.15) : speed;

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });

    // Move all useTransform calls to top level with easing options
    const getEasingFunction = (type: string): import("framer-motion").EasingFunction => {
      switch(type) {
        case "easeIn": return cubicBezier(0.42, 0, 1, 1);
        case "easeOut": return cubicBezier(0, 0, 0.58, 1);
        case "easeInOut": return cubicBezier(0.42, 0, 0.58, 1);
        default: return cubicBezier(0, 0, 1, 1); // linear
      }
    };

    const easingValues = getEasingFunction(easing);

    // Apply easing to transform values
    const yUp = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${-effectiveSpeed * 100}%`],
      { ease: easingValues }
    );
    const yDown = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${effectiveSpeed * 100}%`],
      { ease: easingValues }
    );
    const xLeft = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${-effectiveSpeed * 100}%`],
      { ease: easingValues }
    );
    const xRight = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${effectiveSpeed * 100}%`],
      { ease: easingValues }
    );

    let transformValue: import("framer-motion").MotionValue<string> | undefined;
    if (direction === "up") {
      transformValue = yUp;
    } else if (direction === "down") {
      transformValue = yDown;
    } else if (direction === "left") {
      transformValue = xLeft;
    } else if (direction === "right") {
      transformValue = xRight;
    }

    const motionStyle =
      direction === "up" || direction === "down"
        ? { y: transformValue }
        : { x: transformValue };

    return (
      <section
        ref={sectionRef}
        className={`relative overflow-hidden ${className}`}
        style={{ willChange: 'transform' }}
      >
        {bgImage && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              ...(!disableParallax && !disableParallaxTemp && !prefersReducedMotion ? motionStyle : {}),
              willChange: !prefersReducedMotion ? 'transform' : 'auto'
            }}
          >
            <Image
              src={bgImage}
              alt={bgImageAlt}
              fill
              className="object-cover"
              quality={quality}
              sizes="100vw"
              priority={priority}
              placeholder="blur"
              blurDataURL={getOptimizedBlurData(bgImage)}
              loading="eager"
              style={{ willChange: 'transform' }}
            />
            <div
                className={`absolute inset-0 z-10 transition-opacity duration-500 ${overlayGradient ? `bg-gradient-${overlayGradientDirection}` : ''}`}
                style={{
                  backgroundColor: !overlayGradient ? overlayColor : undefined,
                  backgroundImage: overlayGradient ? `linear-gradient(${overlayGradientDirection.replace('to-', 'to ')} , ${overlayGradientColors[0]}, ${overlayGradientColors[1]})` : undefined,
                  opacity: overlayOpacity,
                  willChange: 'opacity, background'
                }}
              />
          </motion.div>
        )}
        <div className="relative z-20">{children}</div>
      </section>
    );
  }
);
ParallaxSection.displayName = "ParallaxSection";
