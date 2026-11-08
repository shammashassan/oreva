"use client";

import * as React from "react";
import { HomepageCMS, homepageSchema } from "@/lib/schemas/homepage";
import { Product } from "@/lib/schemas/product";
import { updateHomepageCMS } from "@/lib/actions/homepage";
import { useForm, SubmitHandler, Controller, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Check, RotateCcw, Sparkles } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "@/components/ui/toast";

interface HomepageCMSEditorProps {
  initialCMS: HomepageCMS;
  products?: Product[];
}

export function HomepageCMSEditor({ initialCMS, products = [] }: HomepageCMSEditorProps) {
  const [isPending, startTransition] = React.useTransition();
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, errors },
  } = useForm<HomepageCMS>({
    resolver: zodResolver(homepageSchema),
    defaultValues: initialCMS,
  });

  // Keep form in sync if initialCMS updates while form is clean
  React.useEffect(() => {
    if (!isDirty) {
      reset(initialCMS);
    }
  }, [initialCMS, reset, isDirty]);

  // Warn user on page navigation/tab close if form has unsaved edits
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const onSubmit: SubmitHandler<HomepageCMS> = (data) => {
    setSavedSuccess(false);

    // Keep sectionVisibility.announcement synchronized with announcement.enabled
    data.sectionVisibility.announcement = data.announcement.enabled;

    startTransition(async () => {
      try {
        await updateHomepageCMS(data);
        reset(data);
        setSavedSuccess(true);
        toast.add({
          title: "Homepage Saved",
          description: "CMS changes published across the live storefront.",
          type: "success",
        });
        setTimeout(() => setSavedSuccess(false), 3000);
      } catch (err: unknown) {
        toast.add({
          title: "Save Failed",
          description: err instanceof Error ? err.message : String(err),
          type: "error",
        });
      }
    });
  };

  const onInvalid = (fieldErrors: FieldErrors<HomepageCMS>) => {
    console.warn("Homepage CMS form validation failed:", fieldErrors);
    toast.add({
      title: "Validation Incomplete",
      description: "Please check the highlighted required fields before saving.",
      type: "error",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-8 w-full max-w-5xl"
    >
      {savedSuccess && (
        <Alert>
          <Check />
          <AlertTitle>Changes Published</AlertTitle>
          <AlertDescription>
            Homepage CMS successfully saved and revalidated across storefront.
          </AlertDescription>
        </Alert>
      )}

      {/* 1. Announcement Bar */}
      <Card>
        <CardHeader>
          <CardTitle>1. Announcement Bar</CardTitle>
          <CardDescription>
            Top global notification banner visible above navigation across the storefront.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="announcement-text">Announcement Message</FieldLabel>
                <Input
                  id="announcement-text"
                  placeholder="Welcome to ORÉVA — Elegance, Made Eternal."
                  {...register("announcement.text")}
                />
                {errors.announcement?.text && (
                  <FieldError>{errors.announcement.text.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="announcement-link">Link Destination</FieldLabel>
                <Input
                  id="announcement-link"
                  placeholder="/shop"
                  {...register("announcement.link")}
                />
                {errors.announcement?.link && (
                  <FieldError>{errors.announcement.link.message}</FieldError>
                )}
              </Field>
            </div>

            <Controller
              control={control}
              name="announcement.enabled"
              render={({ field }) => (
                <div className="flex items-center gap-2 pt-1">
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setValue("sectionVisibility.announcement", checked, {
                        shouldDirty: true,
                      });
                    }}
                    id="announcement-toggle"
                  />
                  <FieldLabel htmlFor="announcement-toggle" className="cursor-pointer">
                    Enable announcement bar at top of site
                  </FieldLabel>
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Hero Campaign */}
      <Card>
        <CardHeader>
          <CardTitle>2. Hero Campaign Banner</CardTitle>
          <CardDescription>
            Primary landing visual and campaign typography at the pinnacle of the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="hero-eyebrow">Eyebrow Label</FieldLabel>
                <Input
                  id="hero-eyebrow"
                  placeholder="THE ART OF ADORNMENT"
                  {...register("hero.eyebrow")}
                />
                {errors.hero?.eyebrow && (
                  <FieldError>{errors.hero.eyebrow.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-title">Brand Heading</FieldLabel>
                <Input
                  id="hero-title"
                  placeholder="ORÉVA"
                  {...register("hero.title")}
                />
                {errors.hero?.title && (
                  <FieldError>{errors.hero.title.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="hero-tagline">Tagline</FieldLabel>
              <Input
                id="hero-tagline"
                placeholder="ELEGANCE, MADE ETERNAL."
                {...register("hero.tagline")}
              />
              {errors.hero?.tagline && (
                <FieldError>{errors.hero.tagline.message}</FieldError>
              )}
            </Field>

            <Controller
              control={control}
              name="hero.image"
              render={({ field }) => (
                <div>
                  <ImageUploader
                    images={field.value ? [field.value] : []}
                    onChange={(imgs) => field.onChange(imgs[0] || "")}
                    multiple={false}
                    folder="oreva/editorial"
                    label="Hero Background Campaign Image"
                    description="High-resolution hero visual. Upload directly to Cloudinary or link an image URL."
                  />
                  {errors.hero?.image && (
                    <FieldError className="mt-1.5">{errors.hero.image.message}</FieldError>
                  )}
                </div>
              )}
            />

            <Field>
              <FieldLabel htmlFor="hero-desc">Hero Narrative Description</FieldLabel>
              <Textarea
                id="hero-desc"
                rows={2}
                placeholder="Discover jewellery designed to complement every moment..."
                {...register("hero.description")}
              />
              {errors.hero?.description && (
                <FieldError>{errors.hero.description.message}</FieldError>
              )}
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="hero-cta-text">CTA Button Text</FieldLabel>
                <Input
                  id="hero-cta-text"
                  placeholder="EXPLORE COLLECTION"
                  {...register("hero.ctaText")}
                />
                {errors.hero?.ctaText && (
                  <FieldError>{errors.hero.ctaText.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-cta-link">CTA Destination Link</FieldLabel>
                <Input
                  id="hero-cta-link"
                  placeholder="/shop"
                  {...register("hero.ctaLink")}
                />
                {errors.hero?.ctaLink && (
                  <FieldError>{errors.hero.ctaLink.message}</FieldError>
                )}
              </Field>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Gender Split Campaign Banners */}
      <Card>
        <CardHeader>
          <CardTitle>3. Gender Split Campaign Banners</CardTitle>
          <CardDescription>
            Dual split editorial portals for Women and Men fine jewellery curations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Women Banner */}
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Women Curation Portal
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="gender-women-title">Heading / Tagline</FieldLabel>
                  <Input
                    id="gender-women-title"
                    placeholder="The Feminine Radiance"
                    {...register("genderBanners.0.title")}
                  />
                  {errors.genderBanners?.[0]?.title && (
                    <FieldError>{errors.genderBanners[0].title.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender-women-link">Link</FieldLabel>
                  <Input
                    id="gender-women-link"
                    placeholder="/shop?gender=women"
                    {...register("genderBanners.0.link")}
                  />
                  {errors.genderBanners?.[0]?.link && (
                    <FieldError>{errors.genderBanners[0].link.message}</FieldError>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="gender-women-desc">Description</FieldLabel>
                <Input
                  id="gender-women-desc"
                  placeholder="Cascading diamond drops, sculpted baroque pearls..."
                  {...register("genderBanners.0.description")}
                />
                {errors.genderBanners?.[0]?.description && (
                  <FieldError>{errors.genderBanners[0].description.message}</FieldError>
                )}
              </Field>
              <Controller
                control={control}
                name="genderBanners.0.image"
                render={({ field }) => (
                  <div>
                    <ImageUploader
                      images={field.value ? [field.value] : []}
                      onChange={(imgs) => field.onChange(imgs[0] || "")}
                      multiple={false}
                      folder="oreva/editorial"
                      label="Women Editorial Image"
                      description="Upload to Cloudinary oreva/editorial."
                    />
                    {errors.genderBanners?.[0]?.image && (
                      <FieldError className="mt-1.5">{errors.genderBanners[0].image.message}</FieldError>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Men Banner */}
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Men Curation Portal
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="gender-men-title">Heading / Tagline</FieldLabel>
                  <Input
                    id="gender-men-title"
                    placeholder="The Masculine Architect"
                    {...register("genderBanners.1.title")}
                  />
                  {errors.genderBanners?.[1]?.title && (
                    <FieldError>{errors.genderBanners[1].title.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender-men-link">Link</FieldLabel>
                  <Input
                    id="gender-men-link"
                    placeholder="/shop?gender=men"
                    {...register("genderBanners.1.link")}
                  />
                  {errors.genderBanners?.[1]?.link && (
                    <FieldError>{errors.genderBanners[1].link.message}</FieldError>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="gender-men-desc">Description</FieldLabel>
                <Input
                  id="gender-men-desc"
                  placeholder="Substantial gadroon cuffs, Roman signet rings..."
                  {...register("genderBanners.1.description")}
                />
                {errors.genderBanners?.[1]?.description && (
                  <FieldError>{errors.genderBanners[1].description.message}</FieldError>
                )}
              </Field>
              <Controller
                control={control}
                name="genderBanners.1.image"
                render={({ field }) => (
                  <div>
                    <ImageUploader
                      images={field.value ? [field.value] : []}
                      onChange={(imgs) => field.onChange(imgs[0] || "")}
                      multiple={false}
                      folder="oreva/editorial"
                      label="Men Editorial Image"
                      description="Upload to Cloudinary oreva/editorial."
                    />
                    {errors.genderBanners?.[1]?.image && (
                      <FieldError className="mt-1.5">{errors.genderBanners[1].image.message}</FieldError>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Editorial Haute Craftsmanship Banner */}
      <Card>
        <CardHeader>
          <CardTitle>4. Haute Craftsmanship Editorial Banner</CardTitle>
          <CardDescription>
            Full-width atelier narrative banner spotlighting craftsmanship and savoir-faire.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="editorial-title">Editorial Heading</FieldLabel>
                <Input
                  id="editorial-title"
                  placeholder="HAUTE CRAFTSMANSHIP"
                  {...register("editorialBanner.title")}
                />
                {errors.editorialBanner?.title && (
                  <FieldError>{errors.editorialBanner.title.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="editorial-link">Destination Link</FieldLabel>
                <Input
                  id="editorial-link"
                  placeholder="/about"
                  {...register("editorialBanner.link")}
                />
                {errors.editorialBanner?.link && (
                  <FieldError>{errors.editorialBanner.link.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="editorial-subtitle">Editorial Narrative Subtitle</FieldLabel>
              <Textarea
                id="editorial-subtitle"
                rows={2}
                placeholder="Every facet cut with exacting precision to capture eternal brilliance."
                {...register("editorialBanner.subtitle")}
              />
              {errors.editorialBanner?.subtitle && (
                <FieldError>{errors.editorialBanner.subtitle.message}</FieldError>
              )}
            </Field>

            <Controller
              control={control}
              name="editorialBanner.image"
              render={({ field }) => (
                <div>
                  <ImageUploader
                    images={field.value ? [field.value] : []}
                    onChange={(imgs) => field.onChange(imgs[0] || "")}
                    multiple={false}
                    folder="oreva/editorial"
                    label="Editorial Feature Photography"
                    description="High-resolution banner visual for atelier narrative. Upload directly to Cloudinary."
                  />
                  {errors.editorialBanner?.image && (
                    <FieldError className="mt-1.5">{errors.editorialBanner.image.message}</FieldError>
                  )}
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* 5. Featured Masterpiece Selection */}
      <Card>
        <CardHeader>
          <CardTitle>5. Featured Masterpiece Product</CardTitle>
          <CardDescription>
            Spotlight a specific jewellery piece in the dedicated Masterpiece section on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field className="max-w-md">
            <FieldLabel>Selected Masterpiece Piece</FieldLabel>
            <Controller
              control={control}
              name="featuredProductId"
              render={({ field }) => (
                <Select
                  value={field.value || "auto"}
                  onValueChange={(val) => {
                    field.onChange(val === "auto" ? null : val);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose spotlight piece" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">
                      (Automatic) First Catalogue Piece
                    </SelectItem>
                    {products.map((p) => {
                      const idVal = p._id ? String(p._id) : p.slug;
                      return (
                        <SelectItem key={idVal} value={idVal}>
                          {p.name} — £{p.price.toLocaleString()}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </CardContent>
      </Card>

      {/* 6. Section Visibility Controls */}
      <Card>
        <CardHeader>
          <CardTitle>6. Section Visibility Toggles</CardTitle>
          <CardDescription>
            Instantly toggle homepage editorial modules without code deployments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Hero Banner", name: "sectionVisibility.hero" as const, id: "sec-hero" },
              { label: "Categories Grid", name: "sectionVisibility.categories" as const, id: "sec-categories" },
              { label: "Gender Panels", name: "sectionVisibility.genderSplit" as const, id: "sec-gender" },
              { label: "New Arrivals", name: "sectionVisibility.newArrivals" as const, id: "sec-arrivals" },
              { label: "Editorial Banner", name: "sectionVisibility.editorialBanner" as const, id: "sec-editorial" },
              { label: "Bestsellers", name: "sectionVisibility.bestsellers" as const, id: "sec-bestsellers" },
              { label: "The Gift Edit", name: "sectionVisibility.giftEdit" as const, id: "sec-gift" },
              { label: "Featured Product", name: "sectionVisibility.featuredProduct" as const, id: "sec-featured" },
              { label: "Brand Experience", name: "sectionVisibility.brandExperience" as const, id: "sec-experience" },
              { label: "Customer Benefits", name: "sectionVisibility.benefits" as const, id: "sec-benefits" },
            ].map((item) => (
              <Controller
                key={item.id}
                control={control}
                name={item.name}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <FieldLabel htmlFor={item.id} className="cursor-pointer">
                      {item.label}
                    </FieldLabel>
                    <Switch
                      id={item.id}
                      checked={field.value !== false}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button & Dirty Check Status */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t">
        <div className="flex items-center gap-2">
          {isDirty ? (
            <span className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-500">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes detected
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-500" />
              All changes published
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isDirty && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isPending}
              onClick={() => reset(initialCMS)}
            >
              <RotateCcw data-icon="inline-start" />
              <span>Discard Changes</span>
            </Button>
          )}

          <Button
            type="submit"
            disabled={isPending || !isDirty}
            size="lg"
          >
            {isPending ? (
              <Loader2 data-icon="inline-start" className="animate-spin" />
            ) : (
              <Save data-icon="inline-start" />
            )}
            <span>Publish Changes</span>
          </Button>
        </div>
      </div>
    </form>
  );
}