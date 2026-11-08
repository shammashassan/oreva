import { getHomepageCMS } from "@/lib/queries/homepage";
import { getProducts } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { getSettings } from "@/lib/queries/settings";
import { WishlistProvider } from "@/components/shared/wishlist-context";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { GenderSplitSection } from "@/components/home/gender-split-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { BestsellersSection } from "@/components/home/bestsellers-section";
import { GiftEditSection } from "@/components/home/gift-edit-section";
import { FeaturedProductSection } from "@/components/home/featured-product-section";
import { BrandExperienceSection } from "@/components/home/brand-experience-section";
import { CustomerBenefitsSection } from "@/components/home/customer-benefits-section";

export default async function HomePage() {
  const [cms, allProducts, categories, settings] = await Promise.all([
    getHomepageCMS(),
    getProducts({ limit: 12 }),
    getCategories(),
    getSettings(),
  ]);

  const newArrivals = allProducts.filter((p) => p.isNewArrival);
  const bestsellers = allProducts.filter((p) => p.isBestseller);
  const featuredProduct =
    (cms.featuredProductId
      ? allProducts.find((p) => String(p._id) === cms.featuredProductId)
      : null) || allProducts[0];

  const isAnnouncementEnabled =
    cms.announcement?.enabled !== false &&
    cms.sectionVisibility?.announcement !== false;

  return (
    <WishlistProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header
          announcementEnabled={isAnnouncementEnabled}
          announcementText={cms.announcement?.text}
          announcementLink={cms.announcement?.link}
          whatsappNumber={settings.whatsappNumber}
        />

        <main className="flex-1">
          {cms.sectionVisibility?.hero !== false && (
            <HeroSection
              title={cms.hero?.title}
              eyebrow={cms.hero?.eyebrow}
              tagline={cms.hero?.tagline}
              description={cms.hero?.description}
              ctaText={cms.hero?.ctaText}
              ctaLink={cms.hero?.ctaLink}
              image={cms.hero?.image}
            />
          )}

          {cms.sectionVisibility?.categories !== false && (
            <CategoriesSection categories={categories} />
          )}

          {cms.sectionVisibility?.genderSplit !== false && (
            <GenderSplitSection banners={cms.genderBanners} />
          )}

          {cms.sectionVisibility?.newArrivals !== false && (
            <NewArrivalsSection
              products={newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 5)}
            />
          )}

          {cms.sectionVisibility?.editorialBanner !== false && (
            <EditorialBanner
              title={cms.editorialBanner?.title}
              subtitle={cms.editorialBanner?.subtitle}
              image={cms.editorialBanner?.image}
              link={cms.editorialBanner?.link}
            />
          )}

          {cms.sectionVisibility?.bestsellers !== false && (
            <BestsellersSection
              products={bestsellers.length > 0 ? bestsellers : allProducts.slice(0, 4)}
            />
          )}

          {cms.sectionVisibility?.giftEdit !== false && <GiftEditSection />}

          {cms.sectionVisibility?.featuredProduct !== false && featuredProduct && (
            <FeaturedProductSection product={featuredProduct} />
          )}

          {cms.sectionVisibility?.brandExperience !== false && (
            <BrandExperienceSection />
          )}

          {cms.sectionVisibility?.benefits !== false && (
            <CustomerBenefitsSection />
          )}
        </main>

        <Footer />
      </div>
    </WishlistProvider>
  );
}
