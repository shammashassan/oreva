"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ROUTE_LABELS: Record<string, string> = {
  "/admin": "Overview",
  "/admin/products": "Catalogue",
  "/admin/categories": "Categories",
  "/admin/collections": "Collections",
  "/admin/homepage": "Homepage CMS",
  "/admin/enquiries": "Client Enquiries",
  "/admin/settings": "Settings",
};

export function DashboardHeader() {
  const pathname = usePathname();

  const currentPageTitle =
    ROUTE_LABELS[pathname] ||
    (pathname.startsWith("/admin/products/")
      ? "Piece Details"
      : "Management");

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 min-w-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <Separator
          orientation="vertical"
          className="data-vertical:h-4 data-vertical:self-center shrink-0"
        />
        <Breadcrumb className="min-w-0">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="hidden sm:block shrink-0">
              <BreadcrumbLink render={<Link href="/admin" />}>
                Atelier
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block shrink-0" />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">{currentPageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Storefront</span>
          <ExternalLink data-icon="inline-end" className="size-3.5" />
        </Link>
      </div>
    </header>
  );
}
