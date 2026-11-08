"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Gem } from "lucide-react";

export function BrandExperienceSection() {
  const pillars = [
    {
      icon: Gem,
      title: "Curated Excellence",
      description:
        "Every single stone is inspected under magnification for color saturation, facet brilliance, and balance.",
    },
    {
      icon: Sparkles,
      title: "Meticulous Finishes",
      description:
        "Hand-polished gadroons, hand-applied vitreous enamels, and seamless invisible prongs.",
    },
    {
      icon: ShieldCheck,
      title: "Heirloom Longevity",
      description:
        "Crafted using premium 18k gold and platinum alloys designed to be treasured for generations.",
    },
    {
      icon: HeartHandshake,
      title: "Direct Concierge Care",
      description:
        "One-on-one personal guidance via WhatsApp from our jewellery specialists in London.",
    },
  ];

  return (
    <section className="w-full py-24 sm:py-28 bg-[#491323] text-[#FFF9F1] relative overflow-hidden">
      {/* Subtle gold foil particle accent in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(199,166,107,0.15),transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        {/* Centered champagne/ivory panel */}
        <div className="max-w-4xl mx-auto bg-[#FFF9F1] text-[#241B1B] p-8 sm:p-16 rounded-xs shadow-2xl border border-[#EDE1D1]">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#491323] font-semibold block">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide font-light">
              The ORÉVA Experience
            </h2>
            <div className="w-16 h-px bg-[#C7A66B] mx-auto my-3" />
            <p className="font-serif italic text-base sm:text-lg text-[#6F635D] max-w-lg mx-auto">
              Luxury is not excess—it is uncompromising intention, intimacy, and enduring grace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mb-12">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex gap-4 items-start">
                  <div className="size-10 rounded-xs bg-[#491323]/5 border border-[#491323]/15 flex items-center justify-center shrink-0 text-[#491323]">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#241B1B]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#6F635D] mt-1 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#491323] hover:bg-[#360d19] text-[#FFF9F1] text-xs font-medium uppercase tracking-[0.22em] rounded-xs transition-all duration-300 shadow-md group"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
