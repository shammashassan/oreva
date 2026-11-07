import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ORÉVA Jewellery House",
  description: "Privacy policy and client data confidentiality commitments of ORÉVA.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-border/50 pb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C7A66B] font-medium block">
            CLIENT CONFIDENTIALITY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-light tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground">
            Effective Date: November 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            At ORÉVA Jewellery House (&ldquo;ORÉVA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
            we preserve the highest discretion and confidentiality regarding
            the personal details and preferences shared by our esteemed clients.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            1. Collection of Client Information
          </h2>
          <p>
            When you explore our digital showcase or communicate with our
            concierge via WhatsApp, telephone, or electronic mail, we collect
            only the information strictly necessary to fulfill your enquiry,
            such as your name, contact phone number, shipping coordinates, and
            curated piece preferences.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            2. WhatsApp Communications
          </h2>
          <p>
            When initiating a conversation through WhatsApp, your communication
            is handled in accordance with Meta’s WhatsApp Business security
            protocols. We do not sell, rent, or lease your private conversational
            records to any third party.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            3. Data Retention & Safeguards
          </h2>
          <p>
            We implement administrative and technical security standards to
            safeguard your information against unauthorized access, loss, or
            alteration.
          </p>

          <h2 className="font-serif text-lg text-foreground font-medium pt-4">
            4. Your Rights
          </h2>
          <p>
            You retain the right at any time to request inspection, modification,
            or complete deletion of your records from our private client
            directory by writing to concierge@oreva.luxury.
          </p>
        </div>
      </div>
    </div>
  );
}
