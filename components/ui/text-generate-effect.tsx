"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  textcolour,
  textSize,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  textcolour?: string;
  textSize?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "0px 0px -20% 0px" });

  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ?? 1,
          delay: stagger(0.2),
        },
      );
    }
  }, [isInView]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div
          className={cn(
            "leading-snug tracking-wide",
            textSize ? textSize : "text-2xl",
            textcolour ? textcolour : "dark:text-white text-black",
          )}
        >
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className={cn(
                  "text-lg opacity-0",
                  textSize ? textSize : "text-lg",
                  textcolour ? textcolour : "text-neutral-400",
                )}
                style={{ filter: filter ? "blur(10px)" : "none" }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
