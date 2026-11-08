import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollections, getCollectionBySlug } from "@/lib/queries/collections";
import { getProducts } from "@/lib/queries/products";
import { ProductCard } from "@/components/shared/product-card";

type ParamsPromise = Promise<{ slug: string }>;

interface CollectionPageProps {
  params: ParamsPromise;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata(
  props: CollectionPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const col = await getCollectionBySlug(slug);
  if (!col) return { title: "Collection Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://oreva-jewellery.vercel.app";
  const canonicalUrl = `${baseUrl}/collections/${col.slug}`;

  return {
    title: col.seo?.title || `${col.name} Collection | ORÉVA`,
    description: col.seo?.description || col.description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function CollectionDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="w-full min-h-[400px] sm:min-h-[480px] bg-muted/60 flex flex-col items-center justify-center space-y-4 px-6">
        <div className="h-3 w-24 bg-muted/80 rounded-xs" />
        <div className="h-10 w-72 bg-muted/80 rounded-xs" />
        <div className="h-4 w-96 max-w-full bg-muted/70 rounded-xs" />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-12">
        <div className="h-4 w-32 bg-muted/60 mb-8 rounded-xs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-muted/60 rounded-xs" />
              <div className="h-4 w-3/4 bg-muted/70 rounded-xs" />
              <div className="h-3 w-1/2 bg-muted/50 rounded-xs" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function CollectionContent({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const colId = collection._id || collection.slug;
  const products = await getProducts({
    collectionId: colId,
  });

  return (
    <>
      {/* Editorial Collection Banner */}
      <div className="relative w-full min-h-[400px] sm:min-h-[480px] flex items-center justify-center overflow-hidden bg-[#241B1B] text-[#FFF9F1]">
        <Image
          src={collection.bannerImage || collection.image}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241B1B] via-black/40 to-black/30" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
            COLLECTION EDIT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wide font-light">
            {collection.name}
          </h1>
          <div className="w-12 h-px bg-[#C7A66B]/60 mx-auto" />
          <p className="text-xs sm:text-sm text-[#EDE1D1] max-w-xl mx-auto leading-relaxed font-light">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Products Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 sm:py-24">
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-border/40">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Showing {products.length} {products.length === 1 ? "Piece" : "Pieces"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-xl text-foreground">
              New pieces are being catalogued for this collection
            </p>
            <p className="text-xs text-muted-foreground">
              Contact our concierge for bespoke requests from this archive.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function CollectionDetailPage(props: CollectionPageProps) {
  return (
    <div className="bg-background">
      <Suspense fallback={<CollectionDetailSkeleton />}>
        <CollectionContent params={props.params} />
      </Suspense>
    </div>
  );
}
