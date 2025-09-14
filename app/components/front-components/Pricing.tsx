import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

import React from "react";
import PricingCard from "./PricingCard";
import { PRICING_PLANS } from "@/constants/pricing";

export default function Pricing() {
  const words = [
    {
      text: "Pricing",
      className:
        "text-xl md:text-2xl lg:text-4xl font-semibold text-neutral-200 tracking-normal",
    },
  ];
  const phrase = "Explore our options and choose a plan that fits your needs";
  return (
    <div
      className={
        "w-full h-full bg-gradient-to-tr from-gbStart to-gbEnd py-[11vh]"
      }
      id={"pricing"}
    >
      <div className={"flex flex-col justify-center items-center mx-2 "}>
        <TypewriterEffect words={words} />
        <TextGenerateEffect words={phrase} duration={0.5} />
      </div>

      <div className="flex flex-wrap justify-center gap-[8rem] mt-10 mx-4">
        {/* PRICE CARDS */}

        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
