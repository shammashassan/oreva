"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { GIFT_EDIT_ITEMS } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function GiftEditSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#FAF6F0] border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block">
            CURATED CELEBRATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide">
            The Gift Edit
          </h2>
          <p className="font-serif italic text-sm text-muted-foreground">
            Thoughtfully packaged in signature royal burgundy cases with antique gold ribbon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GIFT_EDIT_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group relative flex flex-col bg-background rounded-xs overflow-hidden border border-border/50 hover:border-[#C7A66B]/50 transition-all duration-500 shadow-xs hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h3 className="font-serif text-xl text-foreground font-normal tracking-wide group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-light">
                    {item.subtitle}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-primary group-hover:text-primary/80">
                  <span>Explore Gifts</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
