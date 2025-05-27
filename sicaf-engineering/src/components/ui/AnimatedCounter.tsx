import React, { useEffect } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  label?: string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  labelClassName?: string;
  staggerOrder?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  duration = 1.45,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  labelClassName = "",
  staggerOrder = 0
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(
        motionValue,
        value,
        {
          duration,
          ease: "easeOut",
          delay: 0.1 * staggerOrder,
          onUpdate: (v) => setDisplay(Number(v.toFixed(decimals)))
        }
      );
      return () => controls.stop();
    }
  }, [isInView, value, duration, decimals, motionValue, staggerOrder]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center p-2 md:p-4 rounded-lg ${className}`}
      style={{ minWidth: 78 }}
    >
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.65 + 0.08*staggerOrder, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-extrabold text-primary flex items-end"
        aria-live="polite"
      >
        {prefix}
        {display}
        {suffix}
      </motion.span>
      {label && (
        <span className={`text-xs md:text-base font-medium text-gray-600 mt-1 ${labelClassName}`}>{label}</span>
      )}
    </div>
  );
};

export default AnimatedCounter;
