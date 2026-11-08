"use client";

import * as React from "react";
import Image from "next/image";
import { Product } from "@/lib/schemas/product";
import { Category } from "@/lib/schemas/category";
import { ProductFormDialog } from "./product-form-dialog";
import { deleteProduct } from "@/lib/actions/products";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";

interface ProductTableProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductTable({
  initialProducts,
  categories,
}: ProductTableProps) {
  const [deletedIds, setDeletedIds] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = React.useState<{
    id: string;
    slug: string;
    name: string;
  } | null>(null);

  const products = React.useMemo(() => {
    return initialProducts.filter((p) => !deletedIds.has(p._id || p.slug));
  }, [initialProducts, deletedIds]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = async () => {
    if (!deletingProduct) return;
    const { id, slug } = deletingProduct;
    try {
      await deleteProduct(id, slug);
      setDeletedIds((prev) => new Set(prev).add(id));
      toast.add({
        title: "Product Removed",
        description: "The piece was deleted from the catalogue.",
        type: "info",
      });
    } catch (err: unknown) {
      toast.add({
        title: "Delete Failed",
        description: err instanceof Error ? err.message : String(err),
        type: "error",
      });
    } finally {
      setDeletingProduct(null);
    }
  };

  const getCategoryName = (id: string) => {
    const found = categories.find((c) => (c._id || c.slug) === id);
    return found ? found.name : id;
  };

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:max-w-sm">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <Input
            type="search"
            placeholder="Filter by piece name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => {
            setEditingProduct(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus data-icon="inline-start" />
          <span>Add Piece</span>
        </Button>
      </div>

      {/* Mobile Card List (screens < md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-center">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No jewellery pieces found</EmptyTitle>
                <EmptyDescription>
                  No pieces match the filter. Try modifying your search.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          filtered.map((product) => {
            const id = product._id || product.slug;
            return (
              <div
                key={id}
                className="flex flex-col gap-3 rounded-lg border bg-card p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="relative size-14 rounded-md overflow-hidden bg-muted shrink-0 border">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-foreground text-sm truncate">
                        {product.name}
                      </span>
                      <Badge
                        variant={product.isActive ? "secondary" : "outline"}
                        className="shrink-0 text-[10px]"
                      >
                        {product.isActive ? "Active" : "Archived"}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize mt-0.5">
                      {getCategoryName(product.categoryId)} • {product.gender}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground mt-0.5">
                      {product.sku}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Price
                    </span>
                    <span className="font-serif font-medium text-base text-foreground">
                      £{product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="size-3.5" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        setDeletingProduct({
                          id,
                          slug: product.slug,
                          name: product.name,
                        })
                      }
                      title="Delete"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop / Tablet Table View (screens >= md) */}
      <div className="hidden md:block rounded-md border bg-card w-full min-w-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Piece</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="py-8 text-center">
                    <Empty>
                      <EmptyHeader>
                        <EmptyTitle>No jewellery pieces found</EmptyTitle>
                        <EmptyDescription>
                          No pieces match the filter. Try modifying your search.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((product) => {
                const id = product._id || product.slug;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative size-9 rounded-md overflow-hidden bg-muted shrink-0 border">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-foreground truncate">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground capitalize">
                            {product.gender}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-muted-foreground">
                        {product.sku}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getCategoryName(product.categoryId)}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        £{product.price.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.isActive ? "secondary" : "outline"}>
                        {product.isActive ? "Active" : "Archived"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            setEditingProduct(product);
                            setIsDialogOpen(true);
                          }}
                          title="Edit"
                        >
                          <Edit2 />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            setDeletingProduct({
                              id,
                              slug: product.slug,
                              name: product.name,
                            })
                          }
                          title="Delete"
                        >
                          <Trash2 className="text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingProduct(null);
        }}
        categories={categories}
        initialData={editingProduct}
      />

      <AlertDialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Piece from Catalogue?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{deletingProduct?.name}&rdquo; from your catalogue. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Delete Piece
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
