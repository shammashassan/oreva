"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Heart, MessageCircle, Menu, ArrowRight, ChevronDown } from "lucide-react";
import { useWishlist } from "./wishlist-context";
import { SearchDialog } from "./search-dialog";
import { WishlistDrawer } from "./wishlist-drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface HeaderProps {
  announcementText?: string;
  announcementLink?: string;
  announcementEnabled?: boolean;
  whatsappNumber?: string;
}

export function Header({
  announcementText = "Welcome to ORÉVA — Discover timeless jewellery designed for every moment.",
  announcementLink = "/shop",
  announcementEnabled = true,
  whatsappNumber = "447123456789",
}: HeaderProps) {
  const { count, setIsOpen: openWishlist } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showAnnouncement = announcementEnabled && Boolean(announcementText && announcementText.trim());

  return (
    <>
      {/* 1. Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#491323] text-[#FFF9F1] px-4 py-2 text-center text-[11px] font-normal tracking-[0.2em] uppercase border-b border-[#3b0f1c] select-none">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex items-center justify-center gap-2">
            <span>{announcementText}</span>
            {announcementLink && (
              <Link
                href={announcementLink}
                className="hidden sm:inline-flex items-center gap-1 text-[#C7A66B] hover:text-[#EDE1D1] underline underline-offset-4 transition-colors font-medium text-[10px]"
              >
                Explore <ArrowRight className="size-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Sticky Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-xs border-b border-border/60"
            : "bg-background border-b border-border/30"
        )}
      >
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-20 flex items-center justify-between">
          {/* Left Section: Mobile hamburger + Desktop Left Navigation */}
          <div className="flex items-center gap-6">
            {/* Mobile hamburger */}
            <div className="flex items-center lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className="-ml-2 text-foreground hover:text-primary"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </Button>
            </div>

            {/* Desktop Left Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* Shop Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  openOnHover
                  delay={80}
                  closeDelay={150}
                  className="text-[11px] uppercase tracking-[0.22em] text-foreground/80 hover:text-primary transition-colors font-medium relative group py-1 inline-flex items-center gap-1 cursor-pointer outline-none select-none"
                >
                  <span>Shop</span>
                  <ChevronDown className="size-3 text-muted-foreground transition-transform duration-200 group-data-[popup-open]:rotate-180" />
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  sideOffset={12}
                  className="w-[400px] p-2"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        Department
                      </DropdownMenuLabel>
                      <DropdownMenuItem render={<Link href="/shop" />}>
                        All Jewellery
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/shop?filter=new" />}>
                        New Arrivals
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/shop?gender=women" />}>
                        Women&apos;s Collection
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/shop?gender=men" />}>
                        Men&apos;s Selection
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup className="border-l border-border/40 pl-3">
                      <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        Categories
                      </DropdownMenuLabel>
                      <DropdownMenuItem render={<Link href="/category/necklaces" />}>
                        Necklaces
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/category/earrings" />}>
                        Earrings
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/category/bracelets" />}>
                        Bracelets &amp; Cuffs
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/category/rings" />}>
                        Rings &amp; Solitaires
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href="/category/enamel-bangles" />}>
                        Enamel Bangles
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/collections"
                className="text-[11px] uppercase tracking-[0.22em] text-foreground/80 hover:text-primary transition-colors font-medium relative group py-1"
              >
                Collections
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>
          </div>

          {/* Centre Brand Wordmark Logo — Locked Exactly at Center */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center pointer-events-auto max-w-[50%]">
            <Link href="/" className="group flex flex-col items-center">
              <span className="font-serif text-xl sm:text-3xl tracking-[0.24em] sm:tracking-[0.28em] text-foreground uppercase font-medium leading-tight truncate">
                ORÉVA
              </span>
              <span className="text-[7.5px] sm:text-[8px] tracking-[0.3em] sm:tracking-[0.35em] text-muted-foreground uppercase mt-0.5 font-light">
                Jewellery House
              </span>
            </Link>
          </div>

          {/* Right Section: Desktop About Link + Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            <Link
              href="/about"
              className="hidden lg:inline-flex text-[11px] uppercase tracking-[0.22em] text-foreground/80 hover:text-primary transition-colors font-medium relative group py-1 mr-2"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/80 hover:text-primary"
              title="Search pieces (Cmd+K)"
              aria-label="Search"
            >
              <Search className="size-4.5" strokeWidth={1.5} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => openWishlist(true)}
              className="relative text-foreground/80 hover:text-primary"
              title="Saved pieces"
              aria-label="Wishlist"
            >
              <Heart className="size-4.5" strokeWidth={1.5} />
              {count > 0 && (
                <Badge
                  variant="burgundy"
                  className="absolute -top-1 -right-1 size-4 p-0 text-[9px] font-bold flex items-center justify-center rounded-full"
                >
                  {count}
                </Badge>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              className="hidden md:inline-flex items-center gap-1.5 h-8 text-[10px] tracking-[0.16em] uppercase font-medium"
              render={
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle className="size-3.5 text-primary" strokeWidth={1.5} />
              <span>Concierge</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Mobile Navigation Drawer via Shadcn Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[340px] p-6 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-5">
            {/* Sheet Brand Header */}
            <SheetHeader className="text-left pb-1">
              <SheetTitle className="font-serif text-2xl tracking-[0.25em] text-foreground uppercase">
                ORÉVA
              </SheetTitle>
              <p className="text-[9px] tracking-[0.28em] text-muted-foreground uppercase">
                Jewellery House
              </p>
            </SheetHeader>

            {/* Quick Actions (Search & Wishlist) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex-1 flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 rounded-xs transition-colors cursor-pointer"
              >
                <Search className="size-3.5" />
                <span>Search catalogue...</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWishlist(true);
                }}
                className="relative flex items-center justify-center size-8 text-muted-foreground bg-muted/40 hover:bg-muted/70 rounded-xs transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="size-3.5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 size-3.5 bg-primary text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </div>

            <Separator className="opacity-60" />

            {/* Primary Destinations */}
            <nav className="flex flex-col gap-1">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-lg tracking-wide text-foreground hover:text-primary transition-colors py-1.5 flex items-center justify-between"
              >
                <span>Shop All</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>
              <Link
                href="/collections"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-lg tracking-wide text-foreground hover:text-primary transition-colors py-1.5 flex items-center justify-between"
              >
                <span>Collections</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>
              <Link
                href="/shop?filter=new"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-lg tracking-wide text-foreground hover:text-primary transition-colors py-1.5 flex items-center justify-between"
              >
                <span>New Arrivals</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-lg tracking-wide text-foreground hover:text-primary transition-colors py-1.5 flex items-center justify-between"
              >
                <span>About the Maison</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>
            </nav>

            {/* Gender Sub-Navigation (Clean 2-Column Buttons) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/shop?gender=women"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2 px-3 border border-border/60 text-[10px] uppercase tracking-[0.2em] text-foreground/80 hover:text-primary hover:border-primary transition-colors rounded-xs"
              >
                Women
              </Link>
              <Link
                href="/shop?gender=men"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2 px-3 border border-border/60 text-[10px] uppercase tracking-[0.2em] text-foreground/80 hover:text-primary hover:border-primary transition-colors rounded-xs"
              >
                Men
              </Link>
            </div>

            {/* Collapsible Categories Section (Collapsed by Default) */}
            <div className="border-t border-border/40 pt-2">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between py-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span>Browse Categories</span>
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    isCategoriesOpen && "rotate-180"
                  )}
                />
              </button>

              {isCategoriesOpen && (
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-2 pb-1 animate-in fade-in-0 duration-200">
                  <Link
                    href="/category/necklaces"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-foreground/75 hover:text-primary transition-colors py-1"
                  >
                    Necklaces
                  </Link>
                  <Link
                    href="/category/earrings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-foreground/75 hover:text-primary transition-colors py-1"
                  >
                    Earrings
                  </Link>
                  <Link
                    href="/category/bracelets"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-foreground/75 hover:text-primary transition-colors py-1"
                  >
                    Bracelets
                  </Link>
                  <Link
                    href="/category/rings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-foreground/75 hover:text-primary transition-colors py-1"
                  >
                    Rings
                  </Link>
                  <Link
                    href="/category/enamel-bangles"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-foreground/75 hover:text-primary transition-colors py-1 col-span-2"
                  >
                    Enamel Bangles
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer of Sheet */}
          <div className="pt-4 flex flex-col gap-3">
            <Separator className="opacity-60" />
            <Button
              variant="default"
              nativeButton={false}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase tracking-widest gap-2 h-9"
              render={
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp Concierge</span>
            </Button>
            <p className="text-[9px] text-center text-muted-foreground tracking-widest uppercase">
              Elegance, Made Eternal.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
