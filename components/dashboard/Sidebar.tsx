"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  FolderTree,
  Sparkles,
  Sliders,
  MessageSquare,
  Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/dashboard/NavUser";
import { OrevaMark } from "@/components/shared/logo";
import { BRAND } from "@/lib/data";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      {
        title: "Atelier Overview",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Catalogue",
    items: [
      {
        title: "Jewellery Collection",
        url: "/admin/products",
        icon: Gem,
      },
      {
        title: "Category Taxonomy",
        url: "/admin/categories",
        icon: FolderTree,
      },
      {
        title: "Curated Collections",
        url: "/admin/collections",
        icon: Sparkles,
      },
    ],
  },
  {
    label: "Clientele & Content",
    items: [
      {
        title: "WhatsApp Enquiries",
        url: "/admin/enquiries",
        icon: MessageSquare,
      },
      {
        title: "Homepage CMS",
        url: "/admin/homepage",
        icon: Sliders,
      },
    ],
  },
  {
    label: "Preferences",
    items: [
      {
        title: "Atelier Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  const defaultUser = {
    name: session?.user?.name || "Atelier Director",
    email: session?.user?.email || BRAND.contact.adminEmail,
    avatar: session?.user?.image || undefined,
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <OrevaMark size={16} showHalo={false} className="text-primary-foreground" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{BRAND.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {BRAND.headquarters.district}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_GROUPS.map((group, groupIdx) => {
          const isLast = groupIdx === NAV_GROUPS.length - 1;
          return (
            <SidebarGroup key={group.label} className={isLast ? "mt-auto" : undefined}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive =
                      item.url === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.url);
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          render={<Link href={item.url} />}
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={defaultUser} onSignOut={handleSignOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
