"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, Product, ProductInput } from "@/lib/schemas/product";
import { Category } from "@/lib/schemas/category";
import { saveProduct } from "@/lib/actions/products";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/responsive-dialog";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "@/components/ui/toast";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  initialData?: Product | null;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  categories,
  initialData,
}: ProductFormDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const defaultValues: ProductInput = initialData
    ? {
        ...initialData,
        categoryId:
          categories.find(
            (c) =>
              c._id === initialData.categoryId ||
              c.slug === initialData.categoryId ||
              `cat_${c.slug}`.toLowerCase().replace(/-/g, "_") ===
                initialData.categoryId.toLowerCase()
          )?._id || initialData.categoryId,
      }
    : {
        name: "",
        slug: "",
        sku: "AUTO",
        description: "",
        price: 100,
        compareAtPrice: null,
        images: [],
        categoryId: categories[0]?._id || "",
        collectionIds: [],
        gender: "women",
        variants: [],
        isFeatured: false,
        isBestseller: false,
        isNewArrival: true,
        isActive: true,
        sortOrder: 0,
      };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (initialData) {
      const matchedCat = categories.find(
        (c) =>
          c._id === initialData.categoryId ||
          c.slug === initialData.categoryId ||
          `cat_${c.slug}`.toLowerCase().replace(/-/g, "_") ===
            initialData.categoryId.toLowerCase()
      );
      const resolvedCatId = matchedCat?._id || initialData.categoryId;
      reset({ ...initialData, categoryId: resolvedCatId });
    } else {
      reset({
        name: "",
        slug: "",
        sku: "AUTO",
        description: "",
        price: 100,
        compareAtPrice: null,
        images: [],
        categoryId: categories[0]?._id || "",
        collectionIds: [],
        gender: "women",
        variants: [],
        isFeatured: false,
        isBestseller: false,
        isNewArrival: true,
        isActive: true,
        sortOrder: 0,
      });
    }
  }, [initialData, categories, reset]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated, { shouldValidate: true });
    }
  };

  const onSubmit = (data: ProductInput) => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        await saveProduct(data);
        toast.add({
          title: initialData ? "Piece Updated" : "Piece Created",
          description: `${data.name} has been catalogued successfully.`,
          type: "success",
        });
        onClose();
      } catch (err: unknown) {
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to save product"
        );
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Piece" : "New Piece"}
          </DialogTitle>
          <DialogDescription>
            Configure catalogue metadata, pricing, and photography.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <FieldGroup>
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="field-prod-name">Piece Title</FieldLabel>
                  <Input
                    id="field-prod-name"
                    {...register("name", {
                      onChange: handleNameChange,
                    })}
                    placeholder="e.g. Royal Baroque Choker"
                  />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="field-prod-slug">URL Slug</FieldLabel>
                  <Input id="field-prod-slug" {...register("slug")} />
                  {errors.slug && <FieldError>{errors.slug.message}</FieldError>}
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="field-prod-sku">SKU Reference</FieldLabel>
                  <Input
                    id="field-prod-sku"
                    {...register("sku")}
                    placeholder="AUTO or custom"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="field-prod-price">Price (£)</FieldLabel>
                  <Input
                    id="field-prod-price"
                    type="number"
                    step="any"
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors.price && <FieldError>{errors.price.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="field-prod-compare">Compare-at (£)</FieldLabel>
                  <Input
                    id="field-prod-compare"
                    type="number"
                    step="any"
                    {...register("compareAtPrice", {
                      setValueAs: (v) => (v === "" || isNaN(v) ? null : Number(v)),
                    })}
                    placeholder="Optional discount"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem
                              key={c._id || c.slug}
                              value={c._id || c.slug}
                            >
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel>Gender Classification</FieldLabel>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="unisex">Unisex</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="field-prod-desc">Description</FieldLabel>
                <Textarea
                  id="field-prod-desc"
                  rows={3}
                  {...register("description")}
                  placeholder="Describe materials, gemstones, and craftsmanship..."
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>

              <Controller
                control={control}
                name="images"
                render={({ field }) => (
                  <ImageUploader
                    images={field.value || []}
                    onChange={field.onChange}
                    multiple={true}
                    maxFiles={6}
                    folder="oreva/products"
                    label="Photography"
                    description="Upload images or paste direct URLs."
                  />
                )}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="switch-active"
                      />
                      <FieldLabel htmlFor="switch-active" className="cursor-pointer">
                        Active
                      </FieldLabel>
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="isNewArrival"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="switch-new"
                      />
                      <FieldLabel htmlFor="switch-new" className="cursor-pointer">
                        New Arrival
                      </FieldLabel>
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="isBestseller"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="switch-bestseller"
                      />
                      <FieldLabel
                        htmlFor="switch-bestseller"
                        className="cursor-pointer"
                      >
                        Bestseller
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
                        id="switch-featured"
                      />
                      <FieldLabel
                        htmlFor="switch-featured"
                        className="cursor-pointer"
                      >
                        Featured
                      </FieldLabel>
                    </div>
                  )}
                />
              </div>
            </FieldGroup>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending && <Loader2 data-icon="inline-start" className="animate-spin" />}
              <span>{initialData ? "Update Piece" : "Save Piece"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
