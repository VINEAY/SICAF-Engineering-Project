"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoaded={isLoaded} />
      <BackgroundMusic />
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.35 } }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ minHeight: "100vh" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
