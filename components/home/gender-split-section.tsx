"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function GenderSplitSection() {
  const panels = [
    {
      gender: "WOMEN",
      tagline: "The Feminine Radiance",
      description:
        "Cascading diamond drops, sculpted baroque pearls, and fluid gold cuffs crafted for effortless modern grace.",
      image: "/images/editorial/gender-women.jpg",
      link: "/shop?gender=women",
    },
    {
      gender: "MEN",
      tagline: "The Masculine Architect",
      description:
        "Substantial gadroon cuffs, Roman signet rings, and understated gold chains defined by weight and integrity.",
      image: "/images/editorial/gender-men.jpg",
      link: "/shop?gender=men",
    },
  ];

  return (
    <section className="w-full bg-[#181213] text-[#FFF9F1] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#382b2b]">
        {panels.map((panel) => (
          <div
            key={panel.gender}
            className="group relative min-h-[500px] sm:min-h-[620px] flex flex-col justify-end p-8 sm:p-14 overflow-hidden"
          >
            {/* Background image with hover zoom */}
            <Image
              src={panel.image}
              alt={`ORÉVA ${panel.gender} Jewellery Collection`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-65 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181213] via-[#181213]/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-4 max-w-md">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block">
                {panel.gender}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF9F1] tracking-wide font-light">
                {panel.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-[#A89B93] leading-relaxed font-light">
                {panel.description}
              </p>
              <div className="pt-2">
                <Link
                  href={panel.link}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "inline-flex items-center gap-2 px-6 py-3 h-auto bg-[#491323] hover:bg-[#360d19] text-[#FFF9F1] text-xs uppercase tracking-[0.2em] font-medium rounded-md shadow-md group/btn"
                  )}
                >
                  <span>Shop {panel.gender}</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
