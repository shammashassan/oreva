import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | ORÉVA Jewellery House",
  description: "Terms and conditions governing the ORÉVA digital jewellery showcase and enquiry services.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-8">
        <div className="space-y-2 border-b border-border/50 pb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block">
            HOUSE POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide">
            Terms & Conditions
          </h1>
          <p className="text-xs text-muted-foreground">
            Effective Date: November 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            Welcome to the digital showcase of ORÉVA Jewellery House. By
            navigating this website or initiating enquiries through our
            concierge services, you agree to comply with the terms set forth
            herein.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            1. Digital Showcase & Enquiries
          </h2>
          <p>
            This website functions as a luxury showcase designed to present our
            artistic collections and facilitate bespoke client communications.
            Products showcased on this site are subject to limited atelier
            availability. Prices are displayed in British Pounds (£) unless
            otherwise specified and may be revised based on prevailing precious
            metal market rates.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            2. Intellectual Property
          </h2>
          <p>
            All visual imagery, typographic trademarks, logo lockups, jewellery
            designs, and written editorial compositions appearing on this site
            remain the exclusive intellectual property of ORÉVA Jewellery House.
            Unauthorized reproduction is strictly prohibited.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            3. Bespoke Orders & Returns
          </h2>
          <p>
            Given the artisanal, made-to-measure nature of fine jewellery,
            bespoke commissions and engraved signet pieces are final upon
            client confirmation. Ready-to-wear pieces may be exchanged within
            14 days of receipt, provided items are returned unworn in their
            original royal burgundy presentation packaging with unbroken seals.
          </p>
        </div>
      </div>
    </div>
  );
}
