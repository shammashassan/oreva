"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/schemas/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";
import { WhatsAppButton } from "./whatsapp-button";
import { useWishlist } from "./wishlist-context";
import { cn } from "cn";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const id = product._id || product.slug;
  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (!isWishlisted) {
      toast.add({
        title: "Added to Wishlist",
        description: `${product.name} saved to your curation.`,
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
    <Card
      className={cn(
        "group relative flex flex-col p-0 overflow-hidden border border-border/40 hover:border-border transition-all duration-500 rounded-lg bg-card shadow-xs",
        className
      )}
    >
      {/* Image container with 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20">
        <Link href={`/products/${product.slug}`} className="relative block size-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.isNewArrival && (
            <Badge variant="gold" className="text-[9px] tracking-[0.2em]">
              New Arrival
            </Badge>
          )}
          {product.isBestseller && (
            <Badge variant="burgundy" className="text-[9px] tracking-[0.2em]">
              Bestseller
            </Badge>
          )}
        </div>

        {/* Wishlist toggle with Tooltip */}
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant={isWishlisted ? "default" : "secondary"}
                size="icon"
                onClick={handleWishlistClick}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={cn(
                  "absolute top-3 right-3 size-8 rounded-full z-10 cursor-pointer shadow-xs",
                  isWishlisted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-background/80 backdrop-blur-xs text-foreground hover:bg-background"
                )}
              />
            }
          >
            <Heart
              className={cn("size-3.5 transition-transform active:scale-125", {
                "fill-current": isWishlisted,
              })}
              strokeWidth={1.5}
            />
          </TooltipTrigger>
          <TooltipContent side="left">
            {isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          </TooltipContent>
        </Tooltip>

        {/* Quick WhatsApp Action overlay on hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 hidden sm:block">
          <WhatsAppButton
            productId={id}
            productName={product.name}
            productSku={product.sku}
            productPrice={product.price}
            variant="primary"
            label="Enquire via WhatsApp"
            className="w-full py-2 text-[10px]"
          />
        </div>
      </div>

      {/* Information */}
      <CardContent className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 font-mono">
            {product.sku}
          </p>
          <Link
            href={`/products/${product.slug}`}
            className="font-serif text-base text-foreground font-normal hover:text-primary transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/30">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-primary">
              £{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                £{product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="sm:hidden">
            <WhatsAppButton
              productId={id}
              productName={product.name}
              productSku={product.sku}
              productPrice={product.price}
              variant="compact"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
