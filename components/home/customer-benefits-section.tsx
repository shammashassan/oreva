"use client";

import * as React from "react";
import { CUSTOMER_BENEFITS } from "@/lib/data";
import { Award, MessageSquareHeart, PackageCheck, Truck } from "lucide-react";

export function CustomerBenefitsSection() {
  const icons = [Award, MessageSquareHeart, PackageCheck, Truck];

  return (
    <section className="py-14 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
          {CUSTOMER_BENEFITS.map((benefit, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={benefit.title}
                className="flex items-center gap-4 px-3 pt-6 sm:pt-0"
              >
                <div className="size-11 rounded-xs bg-[#491323]/5 border border-[#491323]/10 flex items-center justify-center shrink-0 text-[#491323]">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-foreground tracking-wide">
                    {benefit.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
