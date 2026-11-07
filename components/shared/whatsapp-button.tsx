"use client";

import * as React from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { trackWhatsAppEnquiry } from "@/lib/actions/enquiries";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

interface WhatsAppButtonProps {
  productId: string;
  productName: string;
  productSku: string;
  productPrice?: number;
  productUrl?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "compact";
  label?: string;
}

export function WhatsAppButton({
  productId,
  productName,
  productSku,
  productPrice,
  productUrl,
  className,
  variant = "primary",
  label = "Enquire via WhatsApp",
}: WhatsAppButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      try {
        const { whatsappUrl } = await trackWhatsAppEnquiry({
          productId,
          productName,
          productSku,
          productPrice,
          productUrl:
            productUrl ??
            (typeof window !== "undefined" ? window.location.href : undefined),
        });
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch (err: unknown) {
        console.error("WhatsApp enquiry error:", err);
      }
    });
  };

  if (variant === "compact") {
    return (
      <Button
        variant="default"
        size="icon"
        onClick={handleEnquiry}
        disabled={isPending}
        title="Enquire on WhatsApp"
        className={cn(
          "size-9 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs cursor-pointer",
          className
        )}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <MessageCircle className="size-4" strokeWidth={1.5} />
        )}
      </Button>
    );
  }

  const shadcnVariant =
    variant === "outline"
      ? "outline"
      : variant === "secondary"
      ? "secondary"
      : "default";

  return (
    <Button
      variant={shadcnVariant}
      onClick={handleEnquiry}
      disabled={isPending}
      className={cn(
        "gap-2.5 px-6 py-3 h-auto text-xs font-medium tracking-[0.18em] uppercase cursor-pointer rounded-sm shadow-xs",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <MessageCircle className="size-4" strokeWidth={1.5} />
      )}
      <span>{label}</span>
    </Button>
  );
}
