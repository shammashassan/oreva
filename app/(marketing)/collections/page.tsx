import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/queries/collections";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Collections",
  description:
    "Explore the signature collections of ORÉVA: The Royal Burgundy Edit, Eternal Gold, Evening Radiance, and Heritage Solitaire.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
            THE ANTHOLOGY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-light tracking-wide">
            Signature Collections
          </h1>
          <p className="font-serif italic text-sm text-muted-foreground">
            Each collection explores a distinct thematic vision of craftsmanship and enduring splendour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <Link
              key={col._id || col.slug}
              href={`/collections/${col.slug}`}
              className="group relative flex flex-col justify-end p-8 sm:p-12 min-h-[420px] rounded-xs overflow-hidden bg-[#241B1B] text-[#FFF9F1] border border-border/40 hover:border-[#C7A66B]/50 transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C7A66B] font-medium block">
                  Collection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wide">
                  {col.name}
                </h2>
                <p className="text-xs text-[#EDE1D1] max-w-md line-clamp-2 font-light">
                  {col.description}
                </p>
                <div className="pt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FFF9F1] font-medium group-hover:text-[#C7A66B] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
