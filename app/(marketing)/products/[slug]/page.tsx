import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/queries/products";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { ProductCard } from "@/components/shared/product-card";

type ParamsPromise = Promise<{ slug: string }>;

interface ProductPageProps {
  params: ParamsPromise;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://oreva-jewellery.vercel.app";
  const canonicalUrl = `${baseUrl}/products/${product.slug}`;

  return {
    title: product.seo?.title || `${product.name} | ORÉVA Fine Jewellery`,
    description: product.seo?.description || product.description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start animate-pulse">
      <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
        <div className="flex sm:flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="size-18 sm:size-20 bg-muted/60 rounded-xs" />
          ))}
        </div>
        <div className="aspect-[4/5] flex-1 bg-muted/60 rounded-xs" />
      </div>
      <div className="lg:col-span-5 space-y-6">
        <div className="h-4 w-24 bg-muted/70 rounded-xs" />
        <div className="h-8 w-3/4 bg-muted/80 rounded-xs" />
        <div className="h-6 w-32 bg-muted/70 rounded-xs" />
        <div className="h-24 w-full bg-muted/60 rounded-xs" />
        <div className="h-12 w-full bg-muted/70 rounded-xs" />
      </div>
    </div>
  );
}

async function ProductContent({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts({ categoryId: product.categoryId, limit: 5 });
  const related = allProducts
    .filter((p) => (p._id || p.slug) !== (product._id || product.slug))
    .slice(0, 4);

  return (
    <div className="space-y-20">
      <ProductDetailView product={product} />

      {related.length > 0 && (
        <div className="pt-16 border-t border-border/40">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block">
              COMPLEMENTARY ADORNMENTS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-light tracking-wide">
              You May Also Admire
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
            {related.map((item) => (
              <ProductCard
                key={item._id || item.slug}
                product={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage(props: ProductPageProps) {
  return (
    <div className="py-12 sm:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductContent params={props.params} />
        </Suspense>
      </div>
    </div>
  );
}
