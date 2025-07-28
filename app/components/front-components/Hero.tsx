import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

import { Separator } from "@/components/ui/separator";

export default function Hero() {
  const words = ["Better", "Efficient", "Innovative", "Modern"];
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className={""}>
        <BackgroundGradientAnimation size={"70%"}>
          <div className="absolute z-30 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl ">
            <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-7xl">
              Make recruiting <br />
              <span className="text-[rgb(120,230,255)] dark:text-[rgb(160,120,255)]">
                <FlipWords words={words} />
              </span>
            </h1>
            <p className="mt-16 max-w-xl text-sm font-medium text-neutral-200 md:text-lg lg:text-xl">
              Helping recruiters source, match, and deliver top-tier candidates
              faster, smarter, and with better results.
            </p>
          </div>
        </BackgroundGradientAnimation>
      </div>

      <Separator
        className={" bg-gradient-to-r  from-gbEnd to-gbEnd  via-gray-500"}
      />
    </div>
  );
}
