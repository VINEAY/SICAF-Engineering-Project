"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Training from "@/components/sections/training";
import Values from "@/components/sections/values";
import WhyChooseUs from "@/components/sections/why-choose-us";
import Contact from "@/components/sections/contact";
import CaseStudies from "@/components/sections/case-studies";
import Blog from "@/components/sections/blog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxSection } from "@/components/ui/parallax-section";
import SplitText from "@/components/ui/SplitText"; // Added import
import SectionReveal from "@/components/ui/SectionReveal"; // Added import
import { useInView } from "framer-motion";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// Custom cursor component
function CustomCursor() {
  // Settings
  const [cursorType, setCursorType] = useState<"default" | "button" | "card" | "audio">("default");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const color = useMotionValue("#fff");
  const glow = useMotionValue("rgba(0,198,216,0.16)");
  const borderColor = useMotionValue("#8af6fe40");
  const [trail, setTrail] = useState<{x:number, y:number, t:number}[]>([]); // for ghost/echo
  const numGhosts = 6;
  const ringColor = useMotionValue("#00E7CE");

  // Animate position
  const springX = useSpring(x, { stiffness: 340, damping: 44 });
  const springY = useSpring(y, { stiffness: 340, damping: 44 });

  // Advanced hover styling
  function setType(type: typeof cursorType | null) {
    switch (type) {
      case "button":
        scale.set(1.4);
        color.set("#01FBFD");
        ringColor.set("#01FBFD");
        glow.set("rgba(1,251,253,0.23)");
        borderColor.set("#02EDF8AA");
        setCursorType("button");
        break;
      case "audio":
        scale.set(1.9);
        color.set("#00778D");
        ringColor.set("#01FBFD");
        glow.set("rgba(0,119,141,0.18)");
        borderColor.set("#11FFFDE0");
        setCursorType("audio");
        break;
      case "card":
        scale.set(1.25);
        color.set("#19A5B2");
        ringColor.set("#00E7CE");
        glow.set("rgba(0,246,237,0.14)");
        borderColor.set("#00F6ED44");
        setCursorType("card");
        break;
      default:
        scale.set(1);
        color.set("#fff");
        ringColor.set("#00E7CE");
        glow.set("rgba(0,198,216,0.16)");
        borderColor.set("#8af6fe40");
        setCursorType("default");
        break;
    }
  }

  // Trailing effect (ghosts)
  useEffect(() => {
    let rafId: number;
    const update = () => {
      setTrail((prev) => {
        const now = performance.now();
        const latest = { x: x.get(), y: y.get(), t: now };
        return [...prev.slice(-numGhosts + 1), latest];
      });
      rafId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(rafId);
  }, [x, y]);

  // Effect for pointer tracking and hover detection
  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => {
      x.set(e.clientX - 18);
      y.set(e.clientY - 18);
    };
    const handleHover = (type: typeof cursorType) => () => setType(type);
    const clear = () => setType("default");
    document.addEventListener("mousemove", move);
    document.querySelectorAll("button, a, .magnetic-button").forEach((el) => {
      el.addEventListener("mouseenter", handleHover("button"));
      el.addEventListener("mouseleave", clear);
    });
    document.querySelectorAll(".cursor-audio").forEach(el => {
      el.addEventListener("mouseenter", handleHover("audio"));
      el.addEventListener("mouseleave", clear);
    });
    document.querySelectorAll(".service-card").forEach(el => {
      el.addEventListener("mouseenter", handleHover("card"));
      el.addEventListener("mouseleave", clear);
    });
    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("button, a, .magnetic-button").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover("button"));
        el.removeEventListener("mouseleave", clear);
      });
      document.querySelectorAll(".cursor-audio").forEach(el => {
        el.removeEventListener("mouseenter", handleHover("audio"));
        el.removeEventListener("mouseleave", clear);
      });
      document.querySelectorAll(".service-card").forEach(el => {
        el.removeEventListener("mouseenter", handleHover("card"));
        el.removeEventListener("mouseleave", clear);
      });
    };
  }, []);

  // Orbiting dots
  const orbitDots = 5;
  const orbitRadius = 19;
  const orbitDuration = 1.7;
  // Animate the rotation angle based on time
  const [orbitMs, setOrbitMs] = useState(Date.now());
  useEffect(() => {
    let raf: number;
    const loop = () => {
      setOrbitMs(Date.now());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Main cursor and special effects
  return (
    <>
      {/* Trailing ghost/echo circles */}
      {trail.map((pos, idx) => (
        <motion.div
          key={idx}
          className="pointer-events-none fixed left-0 top-0 z-[99998]"
          style={{
            x: pos.x,
            y: pos.y,
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "linear-gradient(120deg, #00c6d8 40%, #003847 100%)",
            opacity: 0.10 + (0.18 * (idx / numGhosts)),
            filter: `blur(${2 + idx * 2}px)`,
            translateX: '-10px',
            translateY: '-10px',
            transition: "background 220ms, filter 280ms",
            zIndex: 99998,
            pointerEvents: "none" as const,
          }}
        />
      ))}
      {/* Main glowing cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          x: springX,
          y: springY,
          width: 36,
          height: 36,
          borderRadius: 99,
          willChange: "transform, box-shadow, background, filter, border",
          scale,
          background: color,
          filter: `blur(2.2px) drop-shadow(0px 0px 18px ${glow.get()})` + (cursorType !== 'default' ? ' brightness(1.06)' : ''),
          boxShadow: `0 0 60px 2.5px ${glow.get()}`,
          border: `2.2px solid ${borderColor.get()}`,
          opacity: cursorType === 'default' ? 0.92 : 0.96,
          transition: "border .18s, background .23s, filter .27s",
          mixBlendMode: "exclusion" as const,
        }}
        aria-hidden
      >
        {/* Elegant animated ring overlay */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 54,
            height: 54,
            x: "-27px",
            y: "-27px",
            borderRadius: "50%",
            border: `2.4px solid ${ringColor.get()}`,
            boxShadow: cursorType !== 'default' ? `0 0 30px 4px ${glow.get()}` : undefined,
            opacity: 0.5,
            filter: `blur(${cursorType === 'default' ? 4 : 1.7}px)`,
            transition: "border-color .16s, box-shadow .23s, filter .17s"
          }}
          animate={{
            scale: cursorType === 'default' ? 1 : 1.13,
            rotate: [0, 360],
            transition: { repeat: Number.POSITIVE_INFINITY, duration: cursorType === 'audio' ? 2 : 5, ease: 'linear' }
          }}
        />
        {/* Orbiting dots */}
        {Array.from({ length: orbitDots }).map((_, i) => {
          const ang = (2 * Math.PI * i / orbitDots) + ((orbitMs/1000) * 2 * Math.PI / orbitDuration);
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(ang) * orbitRadius}px - 3px)`,
                top: `calc(50% + ${Math.sin(ang) * orbitRadius}px - 3px)`,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: `linear-gradient(130deg, #06c4d0 70%, #00778D 100%)`,
                boxShadow: `0 0 6px 1.5px #02edf8${cursorType==='audio' ? 'cc' : '77'}`,
                opacity: 0.72 + 0.15 * Math.sin(ang*2),
                transition: "background 160ms, opacity 180ms"
              }}
            />
          );
        })}
      </motion.div>
    </>
  );
}

// Scroll behavior setup with GSAP
function ScrollBehavior({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initScrollTriggers = () => {
      // Reveal animations on scroll
      const sections = document.querySelectorAll(".section-animation");
      for (const section of sections) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => section.classList.add("is-visible"),
          once: true,
        });
      }

      // Add parallax effects to background images
      const parallaxElements = document.querySelectorAll(".parallax-bg");
      for (const element of parallaxElements) {
        gsap.to(element, {
          y: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Create staggered animations for lists and grids
      const staggerContainers = document.querySelectorAll(".stagger-container");
      for (const container of staggerContainers) {
        const items = container.querySelectorAll(".stagger-item");

        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          onEnter: () => {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          once: true
        });
      }
    };

    // Initialize all scroll animations after a short delay to ensure DOM is ready
    setTimeout(() => {
      initScrollTriggers();
    }, 100);

    return () => {
      // Clean up all ScrollTrigger instances
      const allTriggers = ScrollTrigger.getAll();
      for (const trigger of allTriggers) {
        trigger.kill();
      }
    };
  }, []);

  return <>{children}</>;
}

// Divider section with parallax background
function ParallaxDivider({
  text,
  bgImage = "/industrial-divider.jpg"  // Placeholder - would need a real image
}: {
  text: string;
  bgImage?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null); // Updated ref creation
  // Parallax for foreground SVG overlay
  const { scrollY } = useScroll();
  const fgY = useTransform(scrollY, [0, 500], [0, -45]);
  return (
    <ParallaxSection
      bgImage={bgImage}
      bgImageAlt="Industrial divider background"
      direction="up"
      speed={0.3}
      overlayColor="rgba(0, 30, 60, 0.7)"
      className="py-32 relative"
      ref={ref}
    >
      {/* Foreground SVG, parallaxed */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none"
        aria-hidden
        style={{ y: fgY }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <g opacity="0.11">
            <line x1="120" y1="33" x2="1380" y2="153" stroke="#22D3EE" strokeWidth="2"/>
            <line x1="70" y1="145" x2="1300" y2="25" stroke="#00778D" strokeWidth="1.5"/>
            {/* Dots */}
            {Array.from({ length: 18 }).map((_, i) => (
              <circle key={i} cx={88 + i*75} cy={82 + Math.sin(i/2)*39} r="2.5" fill="#00F6ED" />
            ))}
          </g>
        </svg>
      </motion.div>
      <div className="container text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          <SplitText
            text={text}
            as="span"
            effect="slide"
            className="block"
            textClassName="inline-block"
          />
        </h2>
      </div>
    </ParallaxSection>
  );
}

export default function Home() {
  return (
    <ScrollBehavior>
      <div className="min-h-screen">
        <CustomCursor />
        <Header />
        <main>
          <Hero />
          <SectionReveal>
            <About />
          </SectionReveal>
          <SectionReveal>
            <ParallaxDivider text="Transform Your Industrial Operations with Our Expert Solutions" bgImage="/industrial-divider.jpg" />
          </SectionReveal>
          <SectionReveal>
            <Services />
          </SectionReveal>
          <SectionReveal>
            <CaseStudies />
          </SectionReveal>
          <SectionReveal>
            <ParallaxDivider text="Develop Your Team's Skills with Specialized Training Programs" />
          </SectionReveal>
          <SectionReveal>
            <Training />
          </SectionReveal>
          <SectionReveal>
            <Values />
          </SectionReveal>
          <SectionReveal>
            <WhyChooseUs />
          </SectionReveal>
          <SectionReveal>
            <Blog />
          </SectionReveal>
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>
        <Footer />
      </div>
    </ScrollBehavior>
  );
}
