import { z } from "zod";

export const homepageSchema = z.object({
  announcement: z.object({
    text: z.string().min(1, "Text is required"),
    link: z.string().min(1, "Link is required"),
    enabled: z.boolean(),
  }),
  hero: z.object({
    title: z.string().min(1, "Title is required"),
    eyebrow: z.string().min(1, "Eyebrow is required"),
    tagline: z.string().min(1, "Tagline is required"),
    description: z.string().min(1, "Description is required"),
    ctaText: z.string().min(1, "CTA Text is required"),
    ctaLink: z.string().min(1, "CTA Link is required"),
    image: z.string().min(1, "Image is required"),
  }),
  genderBanners: z.array(
    z.object({
      gender: z.enum(["women", "men"]),
      title: z.string(),
      description: z.string(),
      image: z.string().min(1),
      link: z.string(),
    })
  ),
  editorialBanner: z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    image: z.string().min(1, "Image is required"),
    link: z.string().min(1, "Link is required"),
  }),
  featuredProductId: z.string().nullable().optional(),
  featuredCollectionIds: z.array(z.string()),
  bestsellerProductIds: z.array(z.string()),
  newArrivalProductIds: z.array(z.string()),
  sectionVisibility: z.object({
    announcement: z.boolean(),
    hero: z.boolean(),
    categories: z.boolean(),
    genderSplit: z.boolean(),
    newArrivals: z.boolean(),
    editorialBanner: z.boolean(),
    bestsellers: z.boolean(),
    giftEdit: z.boolean(),
    featuredProduct: z.boolean(),
    brandExperience: z.boolean(),
    benefits: z.boolean(),
  }),
});

export type HomepageCMS = z.infer<typeof homepageSchema>;

export const DEFAULT_HOMEPAGE_CMS: HomepageCMS = {
  announcement: {
    text: "Welcome to ORÉVA — Elegance, Made Eternal.",
    link: "/shop",
    enabled: true,
  },
  hero: {
    title: "ORÉVA",
    eyebrow: "THE ART OF ADORNMENT",
    tagline: "ELEGANCE, MADE ETERNAL.",
    description: "Discover jewellery designed to complement every moment.",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/shop",
    image: "/images/editorial/hero-campaign.jpg",
  },
  genderBanners: [
    {
      gender: "women",
      title: "WOMEN",
      description: "Radiant silhouettes, timeless grace.",
      image: "/images/editorial/gender-women.jpg",
      link: "/shop?gender=women",
    },
    {
      gender: "men",
      title: "MEN",
      description: "Understated refinement, bold precision.",
      image: "/images/editorial/gender-men.jpg",
      link: "/shop?gender=men",
    },
  ],
  editorialBanner: {
    title: "HAUTE CRAFTSMANSHIP",
    subtitle:
      "Every facet cut with exacting precision to capture eternal brilliance.",
    image: "/images/editorial/craftsmanship-banner.jpg",
    link: "/about",
  },
  featuredProductId: null,
  featuredCollectionIds: [],
  bestsellerProductIds: [],
  newArrivalProductIds: [],
  sectionVisibility: {
    announcement: true,
    hero: true,
    categories: true,
    genderSplit: true,
    newArrivals: true,
    editorialBanner: true,
    bestsellers: true,
    giftEdit: true,
    featuredProduct: true,
    brandExperience: true,
    benefits: true,
  },
};

export const INITIAL_HOMEPAGE_CMS = DEFAULT_HOMEPAGE_CMS;
