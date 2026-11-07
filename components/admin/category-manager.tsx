"use client";

import * as React from "react";
import Image from "next/image";
import { Category, CategoryInput, categorySchema } from "@/lib/schemas/category";
import { saveCategory, deleteCategory } from "@/lib/actions/categories";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/responsive-dialog";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
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
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "@/components/ui/toast";

interface CategoryManagerProps {
  initialCategories: Category[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = React.useState(initialCategories);
  const [prevInitial, setPrevInitial] = React.useState(initialCategories);
  if (initialCategories !== prevInitial) {
    setPrevInitial(initialCategories);
    setCategories(initialCategories);
  }
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [deletingCategory, setDeletingCategory] = React.useState<{
    id: string;
    slug: string;
    name: string;
  } | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!editingCategory) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  };

  const openCreate = () => {
    setEditingCategory(null);
    reset({
      name: "",
      slug: "",
      description: "",
      image:
        "/images/categories/necklaces.jpg",
      sortOrder: categories.length + 1,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    reset({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      sortOrder: cat.sortOrder,
      isActive: cat.isActive,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: CategoryInput) => {
    startTransition(async () => {
      try {
        await saveCategory(data);
        toast.add({
          title: editingCategory ? "Category Updated" : "Category Created",
          description: `${data.name} saved successfully.`,
          type: "success",
        });
        setIsDialogOpen(false);
      } catch (err: unknown) {
        toast.add({
          title: "Save Failed",
          description: err instanceof Error ? err.message : String(err),
          type: "error",
        });
      }
    });
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;
    const { id, slug, name } = deletingCategory;
    try {
      await deleteCategory(id, slug);
      setCategories((prev) => prev.filter((c) => (c._id || c.slug) !== id));
      toast.add({
        title: "Category Deleted",
        description: `${name} was removed from catalogue.`,
        type: "info",
      });
    } catch (err: unknown) {
      toast.add({
        title: "Delete Failed",
        description: err instanceof Error ? err.message : String(err),
        type: "error",
      });
    } finally {
      setDeletingCategory(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {categories.length} categories
        </p>
        <Button onClick={openCreate}>
          <Plus data-icon="inline-start" />
          <span>New Category</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const id = cat._id || cat.slug;
          return (
            <Card key={id} className="pt-0 justify-between">
              <div className="relative aspect-video w-full bg-muted">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={cat.isActive ? "secondary" : "outline"}>
                    {cat.isActive ? "Active" : "Hidden"}
                  </Badge>
                </div>
              </div>

              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{cat.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    Order: {cat.sortOrder}
                  </span>
                </div>
                <CardDescription>
                  <span className="line-clamp-2">
                    {cat.description || "No description provided."}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardFooter className="justify-end">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(cat)}
                    title="Edit"
                  >
                    <Edit2 />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setDeletingCategory({
                        id,
                        slug: cat.slug,
                        name: cat.name,
                      })
                    }
                    title="Delete"
                  >
                    <Trash2 className="text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Official Shadcn Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "New Category"}
            </DialogTitle>
            <DialogDescription>
              Configure category details and cover photography.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="cat-name">Category Name</FieldLabel>
                <Input
                  id="cat-name"
                  {...register("name", {
                    onChange: handleNameChange,
                  })}
                  placeholder="e.g. Chokers & Collars"
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="cat-slug">URL Slug</FieldLabel>
                <Input id="cat-slug" {...register("slug")} />
                {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
              </Field>

              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageUploader
                    images={field.value ? [field.value] : []}
                    onChange={(imgs) => field.onChange(imgs[0] || "")}
                    multiple={false}
                    folder="oreva/categories"
                    label="Cover Image"
                    description="Upload an image or paste an image URL."
                  />
                )}
              />

              <Field>
                <FieldLabel htmlFor="cat-desc">Description</FieldLabel>
                <Textarea
                  id="cat-desc"
                  rows={2}
                  {...register("description")}
                  placeholder="Brief summary..."
                />
              </Field>

              <div className="flex items-center justify-between pt-2">
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="cat-active"
                      />
                      <FieldLabel htmlFor="cat-active" className="cursor-pointer">
                        Active
                      </FieldLabel>
                    </div>
                  )}
                />
                <div className="flex items-center gap-2">
                  <FieldLabel htmlFor="cat-order">Order:</FieldLabel>
                  <Input
                    id="cat-order"
                    type="number"
                    {...register("sortOrder", { valueAsNumber: true })}
                    className="w-20"
                  />
                </div>
              </div>
            </FieldGroup>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending && <Loader2 data-icon="inline-start" className="animate-spin" />}
                <span>Save</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Official Shadcn AlertDialog for Deletion Confirmation */}
      <AlertDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{deletingCategory?.name}&rdquo;. Pieces assigned to this category will need reassignment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
