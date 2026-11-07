"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    toast.add({
      title: "Joined Guestbook",
      description: "You will receive private previews and collection releases.",
      type: "success",
    });
  };

  return (
    <footer className="bg-[#241B1B] text-[#EDE1D1] pt-16 pb-8 border-t border-[#382b2b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-[#382b2b]">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4 min-w-0">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-[#FFF9F1] uppercase font-light">
                ORÉVA
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#C7A66B] uppercase mt-0.5">
                Jewellery House
              </span>
            </Link>
            <p className="text-xs text-[#A89B93] max-w-sm leading-relaxed font-light">
              Contemporary accessible luxury jewellery house built around
              elegance, individuality and timeless design. Curating eternal
              adornments for life&apos;s most cherished moments.
            </p>
            <p className="text-[11px] text-[#C7A66B] tracking-[0.15em] italic font-serif">
              Elegance, Made Eternal.
            </p>
          </div>

          {/* Column 2: The House (2 cols) */}
          <div className="lg:col-span-2 space-y-3 min-w-0">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#FFF9F1]">
              The House
            </h4>
            <ul className="space-y-2 text-xs text-[#A89B93]">
              <li>
                <Link href="/about" className="hover:text-[#FFF9F1] transition-colors">
                  About ORÉVA
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="hover:text-[#FFF9F1] transition-colors">
                  Our Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFF9F1] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C7A66B] transition-colors text-[10px] tracking-widest uppercase">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3 min-w-0">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#FFF9F1]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A89B93]">
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-[#FFF9F1] transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-[#FFF9F1] transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bracelets" className="hover:text-[#FFF9F1] transition-colors">
                  Bracelets & Cuffs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=rings" className="hover:text-[#FFF9F1] transition-colors">
                  Rings & Bands
                </Link>
              </li>
              <li>
                <Link href="/shop?category=enamel-bangles" className="hover:text-[#FFF9F1] transition-colors">
                  Enamel Bangles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5 min-w-0">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#FFF9F1]">
              Stay Connected
            </h4>
            <p className="text-xs text-[#A89B93] leading-relaxed">
              Receive private previews, jewellery care guides, and exclusive collection releases.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-[#491323]/50 border border-[#C7A66B]/30 text-xs text-[#FFF9F1]">
                <Check className="size-4 text-[#C7A66B]" />
                <span>You have been added to our guestbook.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm">
                <div className="relative flex items-center">
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181213] border-[#382b2b] text-xs text-[#FFF9F1] placeholder:text-[#685952] px-3.5 h-10 pr-11 rounded-md focus-visible:ring-1 focus-visible:ring-[#C7A66B]"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 bg-[#491323] hover:bg-[#3a0e1c] text-[#FFF9F1] rounded-md transition-colors"
                  >
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </form>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#A89B93]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C7A66B] transition-colors"
              >
                Instagram
              </a>
              <span className="text-[#382b2b] select-none">•</span>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C7A66B] transition-colors"
              >
                Pinterest
              </a>
              <span className="text-[#382b2b] select-none">•</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C7A66B] transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A89B93]">
          <p>© 2026 ORÉVA Jewellery House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#FFF9F1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FFF9F1] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#FFF9F1] transition-colors">
              Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
