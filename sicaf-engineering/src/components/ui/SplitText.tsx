import React from "react";
import { motion } from "framer-motion";

type SplitTextEffect = "fade" | "slide" | "wave" | "grow";

type SplitTextMode = "letters" | "words" | "both";

interface SplitTextProps {
  text: string;
  effect?: SplitTextEffect; // animation style
  duration?: number;
  delay?: number;
  stagger?: number;
  mode?: SplitTextMode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  textClassName?: string;
}

export default function SplitText({
  text,
  effect = "wave",
  duration = 0.62,
  delay = 0,
  stagger = 0.045,
  mode = "letters",
  as: Tag = "span",
  className = "",
  textClassName = "",
}: SplitTextProps) {
  // Helper: split into words/letters
  const words: string[] = text.split(" ");
  let splitArr: Array<string[]>;
  if (mode === "letters") splitArr = words.map((w: string) => w.split("").length === 0 ? [""] : w.split(""));
  else if (mode === "words") splitArr = words.map((w: string) => [w]);
  else splitArr = words.map((w: string) => w.split("").length === 0 ? [""] : w.split(""));

  // Animation variants
  const getVariants = (index: number, wordIdx?: number) => {
    switch (effect) {
      case "grow":
        return {
          hidden: { y: 20, opacity: 0, scale: 0.75 },
          visible: {
            y: 0, opacity: 1, scale: 1,
            transition: {
              duration, delay: delay + (wordIdx ?? 0) * 0.05 + index * stagger,
              ease: [0.23, 1, 0.32, 1],
            },
          },
        };
      case "slide":
        return {
          hidden: { y: -24, opacity: 0 },
          visible: {
            y: 0, opacity: 1,
            transition: {
              duration, delay: delay + (wordIdx ?? 0) * 0.04 + index * stagger,
              ease: [0.23, 1, 0.32, 1],
            }
          },
        };
      case "wave":
        return {
          hidden: { y: 22, opacity: 0, rotate: -7 },
          visible: {
            y: 0, opacity: 1, rotate: 0,
            transition: {
              duration, delay: delay + (wordIdx ?? 0) * 0.06 + Math.sin(index) * 0.04 + index * stagger,
              ease: [0.23, 1, 0.32, 1],
            }
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: duration * 0.9,
              delay: delay + (wordIdx ?? 0) * 0.04 + index * stagger,
              ease: "easeOut",
            }
          },
        }
    }
  };

  // Animate presence: when enters viewport, animate
  // Container animates-in as well for stagger
  return (
    <Tag className={className} style={{ display: "inline-block", overflow: "visible" }}>
      {splitArr.map((letters: string[], wordIdx: number) => (
        <motion.span
          key={`word-${wordIdx}`}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letters.map((char: string, i: number) => (
            <motion.span
              key={`char-${char}-${i}`}
              className={textClassName}
              variants={getVariants(i, wordIdx)}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
          {mode !== "letters" && wordIdx < splitArr.length - 1 && " "}
        </motion.span>
      ))}
    </Tag>
  );
}
