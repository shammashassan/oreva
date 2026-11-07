import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";

export const metadata: Metadata = {
  title: {
    default: BRAND.seo.adminTitle,
    template: "%s | Atelier Management",
  },
  description: BRAND.adminPortalDescription,
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminAuthGuard />
      <Suspense
        fallback={
          <div className="w-64 h-full bg-sidebar border-r border-sidebar-border" />
        }
      >
        <DashboardSidebar />
      </Suspense>
      <SidebarInset className="min-w-0 max-w-full overflow-x-hidden">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0 max-w-full">
          <div className="mx-auto max-w-6xl w-full min-w-0">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
