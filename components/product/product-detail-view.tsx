"use client";

import * as React from "react";
import Image from "next/image";
import { Product } from "@/lib/schemas/product";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { useWishlist } from "@/components/shared/wishlist-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/toast";
import { Heart, ShieldCheck, Sparkles, Truck, RefreshCw } from "lucide-react";
import { cn } from "cn";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedVariants, setSelectedVariants] = React.useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((v) => {
      if (v.options.length > 0) {
        initial[v.name] = v.options[0];
      }
    });
    return initial;
  });

  const { isInWishlist, toggleItem } = useWishlist();
  const id = product._id || product.slug;
  const isWishlisted = isInWishlist(id);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/images/products/aurora-solitaire-pendant.jpg"];

  const handleWishlistToggle = () => {
    toggleItem(product);
    if (!isWishlisted) {
      toast.add({
        title: "Added to Wishlist",
        description: `${product.name} saved to your personal curation.`,
        type: "success",
      });
    } else {
      toast.add({
        title: "Removed from Wishlist",
        description: `${product.name} removed from your curation.`,
        type: "info",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 2xl:gap-20 items-start">
      {/* Left: Product Images Gallery */}
      <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] 2xl:sm:max-h-[760px] shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "relative size-18 sm:size-20 rounded-md overflow-hidden border transition-all cursor-pointer bg-muted shrink-0",
                  selectedImage === idx
                    ? "border-primary ring-2 ring-primary/40"
                    : "border-border/60 opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} preview ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Hero Image */}
        <div className="relative aspect-[4/5] flex-1 rounded-lg overflow-hidden bg-muted/20 border border-border/40 shadow-xs">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center transition-transform duration-700 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNewArrival && (
              <Badge variant="gold" className="text-[10px] tracking-[0.2em]">
                New Arrival
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="burgundy" className="text-[10px] tracking-[0.2em]">
                Bestseller
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Right: Product Info & Actions */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {product.sku}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A66B] font-medium">
              Handcrafted in London
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-serif text-2xl sm:text-3xl font-medium text-primary">
              £{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-muted-foreground line-through">
                £{product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <Separator />

        {/* Variants Selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-4">
            {product.variants.map((variant) => (
              <div key={variant.name} className="space-y-2">
                <label className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground block">
                  {variant.name}:{" "}
                  <span className="font-normal text-muted-foreground">
                    {selectedVariants[variant.name]}
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => {
                    const isSelected = selectedVariants[variant.name] === option;
                    return (
                      <Button
                        key={option}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [variant.name]: option,
                          }))
                        }
                        className={cn(
                          "px-3.5 py-1.5 h-auto text-xs tracking-wider transition-all",
                          isSelected && "bg-primary text-primary-foreground font-medium shadow-xs"
                        )}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <WhatsAppButton
            productId={id}
            productName={product.name}
            productSku={product.sku}
            productPrice={product.price}
            label="Enquire via WhatsApp Concierge"
            variant="primary"
            className="w-full py-3.5 text-xs font-semibold"
          />

          <Button
            type="button"
            variant="outline"
            onClick={handleWishlistToggle}
            className={cn(
              "w-full py-3 h-auto text-xs uppercase tracking-[0.18em] font-medium transition-all gap-2",
              isWishlisted && "border-primary bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            <Heart
              className={cn("size-4", isWishlisted && "fill-current text-primary")}
              strokeWidth={1.5}
            />
            <span>
              {isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
            </span>
          </Button>
        </div>

        {/* Accordions for Product Story, Details & Care */}
        <Accordion className="w-full border-t border-border/50">
          <AccordionItem value="craft">
            <AccordionTrigger className="text-xs uppercase tracking-[0.18em] font-medium py-3.5 text-foreground hover:no-underline">
              The Piece & Craft
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light pb-4">
              {product.description}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specifications">
            <AccordionTrigger className="text-xs uppercase tracking-[0.18em] font-medium py-3.5 text-foreground hover:no-underline">
              Materials & Authenticity
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light pb-4 space-y-2">
              <p>• Certified conflict-free natural gems & 18k solid gold composition</p>
              <p>• Hand-finished by master London artisans with hallmark assay stamps</p>
              <p>• Accompanied by official ORÉVA Certificate of Authenticity</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping">
            <AccordionTrigger className="text-xs uppercase tracking-[0.18em] font-medium py-3.5 text-foreground hover:no-underline">
              Delivery & Concierge Returns
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light pb-4 space-y-2">
              <p>• Complimentary insured next-day delivery on all domestic orders</p>
              <p>• Discreet, luxury presentation packaging suitable for gifting</p>
              <p>• 14-day dedicated concierge return and complimentary resizing service</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Brand Reassurances Card */}
        <Card className="bg-[#FAF6F0] border-border/60">
          <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-foreground">
            <div className="flex items-center gap-3">
              <Sparkles className="size-4 text-[#C7A66B] shrink-0" />
              <span>Solid 18k gold & high-luster certified natural stones</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-[#491323] shrink-0" />
              <span>Includes ORÉVA Certificate of Authenticity</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="size-4 text-[#6F635D] shrink-0" />
              <span>Complimentary insured express delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="size-4 text-[#6F635D] shrink-0" />
              <span>Direct concierge exchange & resizing support</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
