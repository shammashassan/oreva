import { Metadata } from "next";
import { getCategories } from "@/lib/queries/categories";
import { CategoryManager } from "@/components/admin/category-manager";

export const metadata: Metadata = {
  title: "Category Management | ORÉVA Admin",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <div>
        <h1 className="font-serif text-3xl text-foreground font-light tracking-wide">
          Categories Management
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Define storefront jewellery classifications, cover imagery, and ordering hierarchy.
        </p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
