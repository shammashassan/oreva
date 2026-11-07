import { Metadata } from "next";
import Link from "next/link";
import { getDashboardMetrics } from "@/lib/queries/analytics";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Gem, FolderTree, Sparkles, MessageSquare, ArrowRight, Inbox, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | ORÉVA",
};

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  const cards = [
    {
      label: "Active Products",
      value: metrics.totalProducts,
      href: "/admin/products",
      icon: Gem,
      description: "Pieces in live showcase",
    },
    {
      label: "Live Categories",
      value: metrics.totalCategories,
      href: "/admin/categories",
      icon: FolderTree,
      description: "Active department groupings",
    },
    {
      label: "Curated Collections",
      value: metrics.totalCollections,
      href: "/admin/collections",
      icon: Sparkles,
      description: "Thematic anthology edits",
    },
    {
      label: "WhatsApp Enquiries",
      value: metrics.totalEnquiries,
      href: "/admin/enquiries",
      icon: MessageSquare,
      description: "Concierge leads recorded",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0">
      {/* Page Title & Quick CTA */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-foreground">
            Atelier Overview
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time catalogue telemetry &amp; WhatsApp concierge interest indicators
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button render={<Link href="/admin/products" />} nativeButton={false} size="sm">
            <Plus data-icon="inline-start" />
            <span>Manage Catalogue</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards using Shadcn Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="group">
              <Card className="h-full justify-between">
                <CardHeader>
                  <CardDescription>
                    {card.label}
                  </CardDescription>
                  <CardAction>
                    <Icon className="size-4 text-muted-foreground" />
                  </CardAction>
                  <CardTitle>
                    {card.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Analytics Split using Shadcn Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Pieces */}
        <Card>
          <CardHeader>
            <CardTitle>Most Enquired Pieces</CardTitle>
            <CardDescription>
              High-intent pieces drawing direct client conversations.
            </CardDescription>
            <CardAction>
              <Button
                render={<Link href="/admin/products" />}
                nativeButton={false}
                variant="ghost"
                size="sm"
              >
                <span>Manage</span>
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardAction>
          </CardHeader>
          <Separator />

          <CardContent>
            {metrics.popularProducts.length === 0 ? (
              <div className="py-8">
                <Empty>
                  <EmptyMedia variant="icon">
                    <Inbox />
                  </EmptyMedia>
                  <EmptyHeader>
                    <EmptyTitle>No Enquiries Yet</EmptyTitle>
                    <EmptyDescription>
                      As visitors click &ldquo;Enquire via WhatsApp&rdquo; on product cards, popular pieces will rank here.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {metrics.popularProducts.map((p) => (
                  <div
                    key={p._id}
                    className="py-3 flex items-center justify-between gap-3 min-w-0"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm text-foreground font-medium truncate">
                        {p.productName}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{p.productSku}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {p.count} {p.count === 1 ? "click" : "clicks"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
            <CardDescription>
              Chronological log of WhatsApp outreach triggers.
            </CardDescription>
            <CardAction>
              <Button
                render={<Link href="/admin/enquiries" />}
                nativeButton={false}
                variant="ghost"
                size="sm"
              >
                <span>View Log</span>
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardAction>
          </CardHeader>
          <Separator />

          <CardContent>
            {metrics.recentEnquiries.length === 0 ? (
              <div className="py-8">
                <Empty>
                  <EmptyMedia variant="icon">
                    <Inbox />
                  </EmptyMedia>
                  <EmptyHeader>
                    <EmptyTitle>No Activity Logged</EmptyTitle>
                    <EmptyDescription>
                      Customer WhatsApp interactions will stream into this log in real time.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {metrics.recentEnquiries.map((e) => (
                  <div
                    key={e._id}
                    className="py-3 flex items-center justify-between gap-3 min-w-0"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm text-foreground font-medium truncate">
                        {e.productName}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {e.productSku} • {e.source}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(e.clickedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
