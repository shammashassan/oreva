"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/schemas/product";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

interface FeaturedProductSectionProps {
  product: Product;
}

export function FeaturedProductSection({
  product,
}: FeaturedProductSectionProps) {
  const id = product._id || product.slug;

  return (
    <section className="py-20 sm:py-28 bg-background overflow-hidden border-t border-border/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 2xl:gap-20 items-center">
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
                MASTERPIECE OF THE SEASON
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-foreground font-light tracking-wide leading-tight">
                {product.name}
              </h2>
            </div>

            <div className="w-16 h-px bg-[#C7A66B]/60" />

            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              {product.description}
            </p>

            <div className="space-y-2 py-2">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-medium text-primary">
                  £{product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    £{product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6F635D] tracking-wider uppercase">
                Reference SKU: {product.sku}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <WhatsAppButton
                productId={id}
                productName={product.name}
                productSku={product.sku}
                productPrice={product.price}
                label="Enquire on WhatsApp"
                variant="primary"
                className="py-3.5"
              />
              <Link
                href={`/products/${product.slug}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "px-6 py-3.5 h-auto text-foreground text-xs uppercase tracking-[0.2em] font-medium rounded-md text-center transition-colors"
                )}
              >
                View Full Details
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Product Visual */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-xs overflow-hidden bg-[#FAF6F0] border border-border/50 shadow-sm group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-103"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-primary font-medium rounded-xs border border-border/40">
                18k Fine Craftsmanship
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
