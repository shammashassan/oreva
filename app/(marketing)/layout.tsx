import { getSettings } from "@/lib/queries/settings";
import { getHomepageCMS } from "@/lib/queries/homepage";
import { WishlistProvider } from "@/components/shared/wishlist-context";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, cms] = await Promise.all([
    getSettings(),
    getHomepageCMS(),
  ]);

  return (
    <WishlistProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header
          announcementText={cms.announcement?.text}
          whatsappNumber={settings.whatsappNumber}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </WishlistProvider>
  );
}
