import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PricingPlanType } from "@/types/pricing.types";
import { Computer } from "lucide-react";
import React from "react";

export default function PricingCard({ plan }: { plan: PricingPlanType }) {
  return (
    <div className="min-h-[16rem] w-[25rem] text-white cursor-pointer">
      <div className="relative h-full rounded-3xl border-2 border-gray-700  p-3 shadow-lg">
        {/* Glowing effect placed behind content */}
        <div className="absolute inset-0 ">
          <GlowingEffect
            spread={50}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={5}
            movementDuration={2}
            className={"rounded-3xl"}
          />
        </div>

        <div className="flex h-full flex-col justify-between gap-6 p-6">
          {/* Price */}
          <div className="w-fit rounded-md border flex items-end justify-center border-gray-600 px-4 py-1.5 text-sm font-medium text-gray-200">
            <h3 className="text-4xl font-semibold text-white">
              £{plan.price}{" "}
            </h3>
            <p className="text-sm text-gray-400">&nbsp;/ {plan.billingCycle}</p>
          </div>

          {/* Plan Name & Description */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
            <p className="text-sm text-gray-400">{plan.description}</p>
          </div>

          {/* Features List */}
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
