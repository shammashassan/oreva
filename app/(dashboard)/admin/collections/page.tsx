import { Metadata } from "next";
import { getCollections } from "@/lib/queries/collections";
import { CollectionManager } from "@/components/admin/collection-manager";

export const metadata: Metadata = {
  title: "Collections Management | ORÉVA Admin",
};

export default async function AdminCollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <div>
        <h1 className="font-serif text-3xl text-foreground font-light tracking-wide">
          Curated Collections
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Organise jewellery pieces into branded storytelling anthologies and editorial banners.
        </p>
      </div>

      <CollectionManager initialCollections={collections} />
    </div>
  );
}
