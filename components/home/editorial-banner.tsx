"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

interface EditorialBannerProps {
  title?: string;
  subtitle?: string;
  image?: string;
  link?: string;
}

export function EditorialBanner({
  title = "HAUTE CRAFTSMANSHIP",
  subtitle = "Every gemstone hand-selected. Every bezel hand-set. An enduring testament to high jewellery mastery.",
  image = "/images/editorial/craftsmanship-banner.jpg",
  link = "/about",
}: EditorialBannerProps) {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#241B1B]">
      <Image
        src={image}
        alt="ORÉVA Haute Craftsmanship"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-[#FFF9F1] space-y-4">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
          THE ATELIER ARCHIVE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.16em] uppercase font-light leading-tight">
          {title}
        </h2>
        <div className="w-12 h-px bg-[#C7A66B]/60 mx-auto my-3" />
        <p className="text-xs sm:text-sm text-[#EDE1D1] max-w-lg mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
        <div className="pt-4">
          <Link
            href={link}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "inline-flex items-center gap-2 px-8 py-3.5 h-auto bg-transparent border-[#EDE1D1] hover:bg-[#FFF9F1] hover:text-[#241B1B] text-[#FFF9F1] text-xs uppercase tracking-[0.22em] font-medium rounded-md transition-all duration-300 group"
            )}
          >
            <span>Discover The Craft</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
