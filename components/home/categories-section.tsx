"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/schemas/category";
import { ArrowRight } from "lucide-react";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block mb-2">
              DISCOVER OUR WORLD
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 font-medium group"
          >
            <span>View All Pieces</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8">
          {categories.map((cat, idx) => (
            <Link
              key={cat._id || cat.slug}
              href={`/category/${cat.slug}`}
              className={`group relative overflow-hidden rounded-xs bg-muted aspect-[3/4] flex flex-col justify-end p-5 transition-all duration-500 ${
                idx === 0 ? "col-span-2 md:col-span-1 md:row-span-2 aspect-auto min-h-[380px]" : ""
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

              <div className="relative z-10 space-y-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C7A66B] font-medium block">
                  Category
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#FFF9F1] font-normal tracking-wide group-hover:translate-x-0.5 transition-transform">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-[11px] text-[#EDE1D1]/80 line-clamp-1 font-light hidden sm:block">
                    {cat.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
