"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/toast";

export function AdminUserMenu() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      toast.add({
        title: "Signed Out",
        description: "You have been logged out of the CMS.",
        type: "info",
      });
      router.push("/login");
      router.refresh();
    } catch (err: unknown) {
      console.error("Sign out error:", err);
      setIsSigningOut(false);
      toast.add({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        type: "error",
      });
    }
  };

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
          />
        }
      >
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex sm:flex-col text-left">
          <p className="text-xs font-medium text-foreground leading-none">
            {user?.name || "Administrator"}
          </p>
          <p className="text-xs text-muted-foreground leading-none mt-1">
            {user?.email || "admin@gmail.com"}
          </p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1 py-1">
            <p className="text-xs font-medium text-foreground">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "admin@gmail.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link href="/admin/settings" />}>
          <Settings data-icon="inline-start" />
          <span>System Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/" target="_blank" rel="noreferrer" />}>
          <ExternalLink data-icon="inline-start" />
          <span>View Live Storefront</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut data-icon="inline-start" />
          <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
