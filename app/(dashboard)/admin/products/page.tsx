import { Metadata } from "next";
import { getProducts } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { ProductTable } from "@/components/admin/product-table";

export const metadata: Metadata = {
  title: "Product Management | ORÉVA Admin",
};

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <div>
        <h1 className="font-serif text-3xl text-foreground font-light tracking-wide">
          Product Catalogue
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage prices, editorial imagery, category placements, and publication flags.
        </p>
      </div>

      <ProductTable
        initialProducts={products}
        categories={categories}
      />
    </div>
  );
}
