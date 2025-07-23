"use client";

import { Separator } from "@/components/ui/separator";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { WobbleCard } from "@/components/ui/wobble-card";
import React from "react";
import PricingCard from "./PricingCard";
import { PRICING_PLANS } from "@/constants/pricing";
import { FEATURES } from "@/constants/features";
import { motion } from "framer-motion";

export default function Features() {
  const words = [
    {
      text: "Features",
      className:
        "text-xl md:text-2xl lg:text-4xl font-semibold text-neutral-200 tracking-normal",
    },
  ];
  const phrase = "What makes our service stand out?";
  return (
    <div id={"features"}>
      <div
        className={
          "w-full h-full bg-gradient-to-tl to-gbStart from-gbEnd py-[11vh]"
        }
      >
        <div className={"flex flex-col justify-center items-center "}>
          <TypewriterEffect words={words} />
          <TextGenerateEffect words={phrase} duration={0.5} />
        </div>

        <div className="flex flex-wrap justify-center gap-[4rem] mt-10">
          {/* FETURES LIST */}

          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group relative h-[12rem] w-[10rem] flex flex-col items-center rounded-xl bg-[#0f0f1a] p-8 text-center border border-[#1e1e2e] shadow-sm hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                borderColor: "#a078ff", // pointerColor
                backgroundColor: "#141422",
              }}
            >
              {/* Icon container with fixed size */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#252525] group-hover:bg-[#303030] transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-gray-200 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Feature label */}
              <h3 className="text-lg font-medium text-gray-100">
                {feature.label}
              </h3>

              {/* Hover effect elements */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/20 pointer-events-none transition-all duration-300" />
              <div className="absolute bottom-0 left-1/2 h-px w-[calc(100%-4rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
      <Separator
        className={" bg-gradient-to-r  from-gbEnd to-gbEnd  via-gray-500"}
      />
    </div>
  );
}
