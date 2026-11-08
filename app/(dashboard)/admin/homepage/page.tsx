import { Metadata } from "next";
import { getHomepageCMS } from "@/lib/queries/homepage";
import { getProducts } from "@/lib/queries/products";
import { HomepageCMSEditor } from "@/components/admin/homepage-cms-editor";

export const metadata: Metadata = {
  title: "Homepage CMS | ORÉVA Admin",
};

export default async function AdminHomepagePage() {
  const [cms, products] = await Promise.all([
    getHomepageCMS(),
    getProducts({ limit: 100 }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl text-foreground font-light tracking-wide">
          Homepage CMS
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Customize campaign announcements, editorial banners, and homepage section displays in real time.
        </p>
      </div>

      <HomepageCMSEditor initialCMS={cms} products={products} />
    </div>
  );
}
