"use client";

import * as React from "react";
import { HomepageCMS, homepageSchema } from "@/lib/schemas/homepage";
import { updateHomepageCMS } from "@/lib/actions/homepage";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Check } from "lucide-react";
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
import { Field, FieldLabel } from "@/components/ui/field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { toast } from "@/components/ui/toast";

interface HomepageCMSEditorProps {
  initialCMS: HomepageCMS;
}

export function HomepageCMSEditor({ initialCMS }: HomepageCMSEditorProps) {
  const [isPending, startTransition] = React.useTransition();
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
  } = useForm<HomepageCMS>({
    resolver: zodResolver(homepageSchema),
    defaultValues: initialCMS,
  });

  const onSubmit: SubmitHandler<HomepageCMS> = (data) => {
    setSavedSuccess(false);
    startTransition(async () => {
      try {
        await updateHomepageCMS(data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-4xl">
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
            Top global notification banner visible above navigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="announcement-text">Announcement Message</FieldLabel>
              <Input
                id="announcement-text"
                {...register("announcement.text")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="announcement-link">Link Destination</FieldLabel>
              <Input
                id="announcement-link"
                {...register("announcement.link")}
              />
            </Field>
          </div>

          <Controller
            control={control}
            name="announcement.enabled"
            render={({ field }) => (
              <div className="flex items-center gap-2 pt-1">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
            Primary landing visual and campaign typography.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="hero-eyebrow">Eyebrow Label</FieldLabel>
                <Input
                  id="hero-eyebrow"
                  {...register("hero.eyebrow")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-title">Brand Heading</FieldLabel>
                <Input
                  id="hero-title"
                  {...register("hero.title")}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="hero-tagline">Tagline</FieldLabel>
              <Input
                id="hero-tagline"
                {...register("hero.tagline")}
              />
            </Field>

            <Controller
              control={control}
              name="hero.image"
              render={({ field }) => (
                <ImageUploader
                  images={field.value ? [field.value] : []}
                  onChange={(imgs) => field.onChange(imgs[0] || "")}
                  multiple={false}
                  folder="oreva/editorial"
                  label="Hero Background Campaign Image"
                  description="High-resolution hero visual. Upload directly to Cloudinary or link an image URL."
                />
              )}
            />

            <Field>
              <FieldLabel htmlFor="hero-desc">Hero Narrative Description</FieldLabel>
              <Textarea
                id="hero-desc"
                rows={2}
                {...register("hero.description")}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="hero-cta-text">CTA Button Text</FieldLabel>
                <Input
                  id="hero-cta-text"
                  {...register("hero.ctaText")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-cta-link">CTA Destination Link</FieldLabel>
                <Input
                  id="hero-cta-link"
                  {...register("hero.ctaLink")}
                />
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
                  <FieldLabel htmlFor="gender-women-title">Heading</FieldLabel>
                  <Input
                    id="gender-women-title"
                    {...register("genderBanners.0.title")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender-women-link">Link</FieldLabel>
                  <Input
                    id="gender-women-link"
                    {...register("genderBanners.0.link")}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="gender-women-desc">Tagline</FieldLabel>
                <Input
                  id="gender-women-desc"
                  {...register("genderBanners.0.description")}
                />
              </Field>
              <Controller
                control={control}
                name="genderBanners.0.image"
                render={({ field }) => (
                  <ImageUploader
                    images={field.value ? [field.value] : []}
                    onChange={(imgs) => field.onChange(imgs[0] || "")}
                    multiple={false}
                    folder="oreva/editorial"
                    label="Women Editorial Image"
                    description="Upload to Cloudinary oreva/editorial."
                  />
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
                  <FieldLabel htmlFor="gender-men-title">Heading</FieldLabel>
                  <Input
                    id="gender-men-title"
                    {...register("genderBanners.1.title")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender-men-link">Link</FieldLabel>
                  <Input
                    id="gender-men-link"
                    {...register("genderBanners.1.link")}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="gender-men-desc">Tagline</FieldLabel>
                <Input
                  id="gender-men-desc"
                  {...register("genderBanners.1.description")}
                />
              </Field>
              <Controller
                control={control}
                name="genderBanners.1.image"
                render={({ field }) => (
                  <ImageUploader
                    images={field.value ? [field.value] : []}
                    onChange={(imgs) => field.onChange(imgs[0] || "")}
                    multiple={false}
                    folder="oreva/editorial"
                    label="Men Editorial Image"
                    description="Upload to Cloudinary oreva/editorial."
                  />
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
                  {...register("editorialBanner.title")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="editorial-link">Destination Link</FieldLabel>
                <Input
                  id="editorial-link"
                  {...register("editorialBanner.link")}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="editorial-subtitle">Editorial Narrative Subtitle</FieldLabel>
              <Textarea
                id="editorial-subtitle"
                rows={2}
                {...register("editorialBanner.subtitle")}
              />
            </Field>

            <Controller
              control={control}
              name="editorialBanner.image"
              render={({ field }) => (
                <ImageUploader
                  images={field.value ? [field.value] : []}
                  onChange={(imgs) => field.onChange(imgs[0] || "")}
                  multiple={false}
                  folder="oreva/editorial"
                  label="Editorial Feature Photography"
                  description="High-resolution banner visual for atelier narrative. Upload directly to Cloudinary."
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* 5. Section Visibility Controls */}
      <Card>
        <CardHeader>
          <CardTitle>5. Section Visibility Toggles</CardTitle>
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

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
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
    </form>
  );
}
