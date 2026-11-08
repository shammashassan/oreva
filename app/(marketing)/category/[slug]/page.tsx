import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/lib/queries/categories";
import { getProducts } from "@/lib/queries/products";
import { ProductCard } from "@/components/shared/product-card";

type ParamsPromise = Promise<{ slug: string }>;

interface CategoryPageProps {
  params: ParamsPromise;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata(
  props: CategoryPageProps
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://oreva-jewellery.vercel.app";
  const canonicalUrl = `${baseUrl}/category/${category.slug}`;

  return {
    title: category.seo?.title || `${category.name} | ORÉVA Jewellery`,
    description: category.seo?.description || category.description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function CategoryDetailSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="h-3 w-28 bg-muted/60 mx-auto rounded-xs" />
        <div className="h-10 w-64 bg-muted/70 mx-auto rounded-xs" />
        <div className="h-4 w-96 max-w-full bg-muted/50 mx-auto rounded-xs" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-muted/60 rounded-xs" />
            <div className="h-4 w-3/4 bg-muted/70 rounded-xs" />
            <div className="h-3 w-1/2 bg-muted/50 rounded-xs" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function CategoryContent({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const catId = category._id || category.slug;
  const products = await getProducts({
    categoryId: catId,
  });

  return (
    <>
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
          CATEGORY ARCHIVE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-light tracking-wide">
          {category.name}
        </h1>
        <div className="w-12 h-px bg-primary/40 mx-auto" />
        <p className="font-serif italic text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="font-serif text-xl text-foreground">
            No pieces currently available in this category
          </p>
          <p className="text-xs text-muted-foreground">
            Please check back shortly or enquire with our concierge.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.slug}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function CategoryDetailPage(props: CategoryPageProps) {
  return (
    <div className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<CategoryDetailSkeleton />}>
          <CategoryContent params={props.params} />
        </Suspense>
      </div>
    </div>
  );
}
