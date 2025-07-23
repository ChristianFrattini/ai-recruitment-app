"use client";

import { Cross, Sparkles } from "lucide-react";

const Separator = () => {
  return (
    <div className="relative  w-full">
      {/* Linea con gradient animato */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#dc4646] to-transparent animate-pulse" />

      {/* Decorazione centrale (stelle e croci) */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-background px-2 flex items-center gap-2">
        <Cross className="w-4 h-4 text-[#dc4646]" />
        <Sparkles className="w-3 h-3 text-[#f05aff] animate-spin" />
        <Cross className="w-4 h-4 text-[#dc4646]" />
      </div>
    </div>
  );
};

export default Separator;
