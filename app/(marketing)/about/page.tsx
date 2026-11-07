import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About The House | ORÉVA",
  description:
    "Discover the heritage, atelier craftsmanship, and design philosophy behind ORÉVA Jewellery House.",
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Editorial Hero */}
      <div className="relative w-full min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#241B1B] text-[#FFF9F1]">
        <Image
          src="/images/editorial/craftsmanship-banner.jpg"
          alt="ORÉVA Atelier Craftsmanship"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181213] via-[#181213]/40 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
            THE ATELIER MANIFESTO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-wide font-light">
            Elegance, Made Eternal.
          </h1>
          <div className="w-16 h-px bg-[#C7A66B]/60 mx-auto" />
          <p className="font-serif italic text-lg sm:text-xl text-[#EDE1D1] max-w-xl mx-auto leading-relaxed">
            Founded with a steadfast devotion to the transformative power of adornment.
          </p>
        </div>
      </div>

      {/* Narrative Section 1 */}
      <section className="py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-semibold block">
              OUR GENESIS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-light leading-snug">
              Jewellery as an Extension of Self
            </h2>
            <div className="w-12 h-px bg-primary/40" />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              ORÉVA was established on the principle that genuine luxury does
              not shout; it resonates through proportion, balance, and quiet
              distinction. Born in London’s historic jewellery district, our
              ateliers unite classical European goldsmithing with modern,
              architectural restraint.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              We design not for transient seasons, but for milestones, heirlooms,
              and the personal private ceremonies of daily life.
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-xs overflow-hidden bg-muted shadow-sm">
            <Image
              src="/images/editorial/about-genesis.jpg"
              alt="ORÉVA Fine Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Narrative Section 2: Craftsmanship */}
        <div id="craftsmanship" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-xs overflow-hidden bg-muted shadow-sm order-2 md:order-1">
            <Image
              src="/images/editorial/about-workshop.jpg"
              alt="ORÉVA Handcrafted Details"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5 order-1 md:order-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-semibold block">
              THE WORKSHOP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-light leading-snug">
              Materials with Conscience & Radiance
            </h2>
            <div className="w-12 h-px bg-primary/40" />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              We work exclusively with recycled 18k solid gold, fine sterling
              silver, and ethically audited gemstones. Every diamond is
              individually inspected for table geometry, girdle symmetry, and
              unrivaled brilliance.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
              <div className="space-y-1">
                <span className="font-serif text-2xl text-primary font-medium">
                  18k
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Solid Yellow & Champagne Gold
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-2xl text-primary font-medium">
                  100%
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Conflict-Free Natural & Lab Diamonds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="pt-10 border-t border-border/40 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-semibold block">
              THE THREE TENETS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-light">
              Our Guiding Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xs bg-[#FAF6F0] border border-border/50 text-center space-y-3">
              <div className="size-12 rounded-full bg-background border border-border mx-auto flex items-center justify-center text-primary">
                <Gem className="size-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg font-medium text-foreground">
                Architectural Restraint
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Eliminating the superfluous so that pure form, light refraction,
                and metal luster remain paramount.
              </p>
            </div>

            <div className="p-8 rounded-xs bg-[#FAF6F0] border border-border/50 text-center space-y-3">
              <div className="size-12 rounded-full bg-background border border-border mx-auto flex items-center justify-center text-primary">
                <Sparkles className="size-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg font-medium text-foreground">
                Heirloom Permanence
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Constructed with substantial wall thicknesses and reinforced
                settings built to be passed to future generations.
              </p>
            </div>

            <div className="p-8 rounded-xs bg-[#FAF6F0] border border-border/50 text-center space-y-3">
              <div className="size-12 rounded-full bg-background border border-border mx-auto flex items-center justify-center text-primary">
                <Compass className="size-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg font-medium text-foreground">
                Direct Intimacy
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Immediate personal communication with our jewellery specialists
                through WhatsApp for every enquiry.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] font-medium rounded-xs hover:bg-primary/90 transition-colors"
            >
              <span>Explore The Catalogue</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
