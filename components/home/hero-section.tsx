"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  tagline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

export function HeroSection({
  eyebrow = "THE ART OF ADORNMENT",
  title = "ORÉVA",
  tagline = "Elegance, Made Eternal.",
  description = "Discover jewellery designed to complement every moment. Handcrafted with timeless precision and quiet distinction.",
  ctaText = "EXPLORE COLLECTION",
  ctaLink = "/shop",
  image = "/images/editorial/hero-campaign.jpg",
}: HeroSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
      ).fromTo(
        textRef.current?.querySelectorAll(".animate-hero-item") || [],
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
        "-=1.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#241B1B]"
    >
      {/* Background Image with subtle editorial vignette */}
      <div ref={imageRef} className="absolute inset-0 size-full">
        <Image
          src={image}
          alt="ORÉVA High Jewellery Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241B1B] via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#181213_100%)] opacity-70" />
      </div>

      {/* Hero Typography & Content */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 2xl:px-12 py-20 text-center flex flex-col items-center"
      >
        <span className="animate-hero-item inline-block text-[10px] sm:text-[11px] tracking-[0.35em] text-[#C7A66B] uppercase font-medium mb-4">
          {eyebrow}
        </span>

        <h1 className="animate-hero-item font-serif text-[clamp(2.75rem,5.5vw+1rem,6.5rem)] text-[#FFF9F1] tracking-[0.18em] uppercase font-light leading-none mb-3">
          {title}
        </h1>

        <div className="animate-hero-item w-16 h-px bg-[#C7A66B]/60 my-4" />

        <p className="animate-hero-item font-serif text-lg sm:text-2xl md:text-3xl italic text-[#EDE1D1] tracking-wide mb-5">
          {tagline}
        </p>

        <p className="animate-hero-item text-xs sm:text-sm text-[#A89B93] max-w-lg leading-relaxed mb-8 font-light">
          {description}
        </p>

        <div className="animate-hero-item flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={ctaLink}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "group px-8 py-3.5 h-auto bg-[#491323] hover:bg-[#380e1a] text-[#FFF9F1] text-xs font-medium tracking-[0.22em] uppercase rounded-md shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            )}
          >
            <span>{ctaText}</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/collections"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-8 py-3.5 h-auto bg-transparent border-[#EDE1D1]/50 hover:border-[#FFF9F1] text-[#FFF9F1] hover:bg-[#FFF9F1] hover:text-[#241B1B] text-xs font-medium tracking-[0.22em] uppercase rounded-md transition-all duration-300"
            )}
          >
            View Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
