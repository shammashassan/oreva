import { Metadata } from "next";
import { getDashboardMetrics } from "@/lib/queries/analytics";
import { getSettings } from "@/lib/queries/settings";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { ExternalLink, Inbox } from "lucide-react";

export const metadata: Metadata = {
  title: "WhatsApp Enquiries | ORÉVA Admin",
};

export default async function AdminEnquiriesPage() {
  const [metrics, settings] = await Promise.all([
    getDashboardMetrics(),
    getSettings(),
  ]);

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground font-light tracking-wide">
            WhatsApp Enquiries &amp; Lead Telemetry
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Detailed audit log of client WhatsApp enquiries initiated from product cards and detail pages.
          </p>
        </div>
        <Badge variant="outline" className="self-start sm:self-auto">
          Total Logged: {metrics.totalEnquiries}
        </Badge>
      </div>

      {/* Mobile Card List (screens < md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {metrics.recentEnquiries.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-center">
            <Empty>
              <EmptyMedia variant="icon">
                <Inbox />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No Enquiries Recorded Yet</EmptyTitle>
                <EmptyDescription>
                  Clicks on &ldquo;Enquire via WhatsApp&rdquo; from the live catalogue will automatically appear here with client intent telemetry.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          metrics.recentEnquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="flex flex-col gap-3 rounded-lg border bg-card p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-foreground text-sm truncate">
                    {enquiry.productName}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground mt-0.5">
                    {enquiry.productSku}
                  </span>
                </div>
                <Badge variant="secondary" className="shrink-0 text-[10px] capitalize">
                  {enquiry.source.replace("_", " ")}
                </Badge>
              </div>

              <div className="flex items-center justify-between border-t pt-3 mt-1 gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(enquiry.clickedAt).toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
                <Button
                  render={
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                >
                  <span>Open WhatsApp</span>
                  <ExternalLink data-icon="inline-end" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View (screens >= md) */}
      <div className="hidden md:block rounded-md border bg-card w-full min-w-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[160px]">Timestamp</TableHead>
              <TableHead className="min-w-[180px]">Piece Enquired</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Source Page</TableHead>
              <TableHead className="text-right">Concierge Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.recentEnquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="py-12">
                    <Empty>
                      <EmptyMedia variant="icon">
                        <Inbox />
                      </EmptyMedia>
                      <EmptyHeader>
                        <EmptyTitle>No Enquiries Recorded Yet</EmptyTitle>
                        <EmptyDescription>
                          Clicks on &ldquo;Enquire via WhatsApp&rdquo; from the live catalogue will automatically appear here with client intent telemetry.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              metrics.recentEnquiries.map((enquiry) => (
                <TableRow key={enquiry._id}>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {new Date(enquiry.clickedAt).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {enquiry.productName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {enquiry.productSku}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground capitalize">
                      {enquiry.source.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      render={
                        <a
                          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                        />
                      }
                      nativeButton={false}
                      variant="ghost"
                      size="sm"
                    >
                      <span>Open WhatsApp</span>
                      <ExternalLink data-icon="inline-end" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
