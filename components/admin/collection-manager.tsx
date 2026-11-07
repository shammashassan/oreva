"use client";

import * as React from "react";
import Image from "next/image";
import { Collection, CollectionInput, collectionSchema } from "@/lib/schemas/collection";
import { saveCollection, deleteCollection } from "@/lib/actions/collections";
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

interface CollectionManagerProps {
  initialCollections: Collection[];
}

export function CollectionManager({
  initialCollections,
}: CollectionManagerProps) {
  const [collections, setCollections] = React.useState(initialCollections);
  const [prevInitial, setPrevInitial] = React.useState(initialCollections);
  if (initialCollections !== prevInitial) {
    setPrevInitial(initialCollections);
    setCollections(initialCollections);
  }
  const [editingCollection, setEditingCollection] =
    React.useState<Collection | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [deletingCollection, setDeletingCollection] = React.useState<{
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
  } = useForm<CollectionInput>({
    resolver: zodResolver(collectionSchema),
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!editingCollection) {
      const slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  };

  const openCreate = () => {
    setEditingCollection(null);
    reset({
      name: "",
      slug: "",
      description: "",
      image:
        "/images/collections/royal-burgundy.jpg",
      bannerImage:
        "/images/collections/royal-burgundy.jpg",
      productIds: [],
      isFeatured: true,
      isActive: true,
      sortOrder: collections.length + 1,
    });
    setIsDialogOpen(true);
  };

  const openEdit = (col: Collection) => {
    setEditingCollection(col);
    reset({
      _id: col._id,
      name: col.name,
      slug: col.slug,
      description: col.description,
      image: col.image,
      bannerImage: col.bannerImage || col.image,
      productIds: col.productIds || [],
      isFeatured: col.isFeatured,
      isActive: col.isActive,
      sortOrder: col.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: CollectionInput) => {
    startTransition(async () => {
      try {
        await saveCollection(data);
        toast.add({
          title: editingCollection ? "Collection Updated" : "Collection Created",
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
    if (!deletingCollection) return;
    const { id, slug, name } = deletingCollection;
    try {
      await deleteCollection(id, slug);
      setCollections((prev) => prev.filter((c) => (c._id || c.slug) !== id));
      toast.add({
        title: "Collection Deleted",
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
      setDeletingCollection(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {collections.length} collections
        </p>
        <Button onClick={openCreate}>
          <Plus data-icon="inline-start" />
          <span>New Collection</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => {
          const id = col._id || col.slug;
          return (
            <Card key={id} className="pt-0 justify-between">
              <div className="relative aspect-video w-full bg-muted">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge variant={col.isActive ? "secondary" : "outline"}>
                    {col.isActive ? "Active" : "Hidden"}
                  </Badge>
                  {col.isFeatured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
              </div>

              <CardHeader className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{col.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    Order: {col.sortOrder}
                  </span>
                </div>
                <CardDescription>
                  <span className="line-clamp-2">
                    {col.description || "No description provided."}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardFooter className="justify-end">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(col)}
                    title="Edit"
                  >
                    <Edit2 />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setDeletingCollection({
                        id,
                        slug: col.slug,
                        name: col.name,
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
              {editingCollection ? "Edit Collection" : "New Collection"}
            </DialogTitle>
            <DialogDescription>
              Configure collection attributes, story, and imagery.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="col-name">Collection Name</FieldLabel>
                  <Input
                    id="col-name"
                    {...register("name", {
                      onChange: handleNameChange,
                    })}
                    placeholder="e.g. Royal Solitaire Anthology"
                  />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="col-slug">URL Slug</FieldLabel>
                  <Input id="col-slug" {...register("slug")} />
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
                      folder="oreva/collections"
                      label="Cover Image"
                      description="Thumbnail for collection cards."
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="bannerImage"
                  render={({ field }) => (
                    <ImageUploader
                      images={field.value ? [field.value] : []}
                      onChange={(imgs) => field.onChange(imgs[0] || "")}
                      multiple={false}
                      folder="oreva/collections"
                      label="Banner Image"
                      description="Wide header image for collection page."
                    />
                  )}
                />

                <Field>
                  <FieldLabel htmlFor="col-desc">Story &amp; Description</FieldLabel>
                  <Textarea
                    id="col-desc"
                    rows={3}
                    {...register("description")}
                    placeholder="Tell the inspiration and craft behind this collection..."
                  />
                </Field>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <Controller
                      control={control}
                      name="isActive"
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="col-active"
                          />
                          <FieldLabel htmlFor="col-active" className="cursor-pointer">
                            Active
                          </FieldLabel>
                        </div>
                      )}
                    />
                    <Controller
                      control={control}
                      name="isFeatured"
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="col-featured"
                          />
                          <FieldLabel htmlFor="col-featured" className="cursor-pointer">
                            Featured
                          </FieldLabel>
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="col-order">Order:</FieldLabel>
                    <Input
                      id="col-order"
                      type="number"
                      {...register("sortOrder", { valueAsNumber: true })}
                      className="w-20"
                    />
                  </div>
                </div>
              </FieldGroup>
            </div>

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
        open={!!deletingCollection}
        onOpenChange={(open) => !open && setDeletingCollection(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Collection?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{deletingCollection?.name}&rdquo;. Products assigned to this collection will remain in the catalogue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Delete Collection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
