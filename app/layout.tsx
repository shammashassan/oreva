import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://oreva-jewellery.vercel.app"),
  title: {
    default: "ORÉVA Jewellery House | Elegance, Made Eternal",
    template: "%s | ORÉVA Jewellery House",
  },
  description:
    "Contemporary accessible luxury jewellery house. Discover curated necklaces, earrings, bracelets, rings, and handcrafted adornments.",
  keywords: [
    "luxury jewellery",
    "fine jewellery",
    "necklaces",
    "bracelets",
    "earrings",
    "rings",
    "ORÉVA",
    "handcrafted jewellery",
  ],
  authors: [{ name: "ORÉVA Jewellery House" }],
  openGraph: {
    title: "ORÉVA Jewellery House | Elegance, Made Eternal",
    description:
      "Contemporary accessible luxury jewellery house. Discover curated necklaces, earrings, bracelets, rings, and handcrafted adornments.",
    type: "website",
    locale: "en_US",
    siteName: "ORÉVA Jewellery House",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://oreva-jewellery.vercel.app",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORÉVA Jewellery House | Elegance, Made Eternal",
    description:
      "Contemporary accessible luxury jewellery house. Discover curated necklaces, earrings, bracelets, rings, and handcrafted adornments.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <NextTopLoader
          color="#C7A66B"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 8px #C7A66B, 0 0 4px #C7A66B"
        />
        <NuqsAdapter>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
