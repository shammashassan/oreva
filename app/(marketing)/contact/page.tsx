import { Metadata } from "next";
import { getSettings } from "@/lib/queries/settings";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Mail, MapPin, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Concierge | ORÉVA",
  description:
    "Direct WhatsApp, telephone, and private appointment assistance with our jewellery house specialists in London.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const rawNumber = settings.whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C7A66B] font-medium block">
            PERSONALIZED ASSISTANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-light tracking-wide">
            Connect with Our Concierge
          </h1>
          <div className="w-12 h-px bg-primary/40 mx-auto" />
          <p className="font-serif italic text-sm text-muted-foreground">
            Whether inquiring about a bespoke creation, requesting sizing
            guidance, or arranging private viewings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 2xl:gap-16 items-start max-w-5xl 2xl:max-w-6xl mx-auto">
          {/* Direct WhatsApp Spotlight Card */}
          <Card className="lg:col-span-5 p-8 sm:p-10 rounded-xl bg-[#491323] text-[#FFF9F1] space-y-6 shadow-xl border-none">
            <div className="space-y-2">
              <Badge variant="gold" className="text-[9px] tracking-[0.3em] uppercase font-semibold">
                PRIMARY CHANNEL
              </Badge>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FFF9F1]">
                WhatsApp Concierge
              </h2>
              <p className="text-xs text-[#EDE1D1] leading-relaxed font-light">
                Connect directly with our team in London for instant photo
                previews, availability confirmations, and personalized ordering.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="default"
                size="lg"
                nativeButton={false}
                className="w-full bg-[#C7A66B] hover:bg-[#b8955a] text-[#241B1B] text-xs font-semibold uppercase tracking-[0.2em] rounded-md gap-2"
                render={
                  <a
                    href={`https://wa.me/${rawNumber}?text=${encodeURIComponent(
                      "Hello ORÉVA, I would like to speak with a jewellery specialist."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <MessageCircle className="size-4" />
                <span>Open WhatsApp Chat</span>
              </Button>
            </div>

            <div className="pt-6 border-t border-[#6d243b] space-y-3 text-xs text-[#EDE1D1]">
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-[#C7A66B] shrink-0" />
                <span>Monday – Saturday: 10:00 – 19:00 GMT</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-[#C7A66B] shrink-0" />
                <span>{settings.phone}</span>
              </div>
            </div>
          </Card>

          {/* Alternative Information & Contact Form */}
          <Card className="lg:col-span-7 bg-card p-8 sm:p-10 rounded-xl border border-border/60 shadow-xs">
            <CardContent className="p-0 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-wider">
                    <Mail className="size-3.5" />
                    <span>Email Inquiries</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{settings.contactEmail}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-wider">
                    <MapPin className="size-3.5" />
                    <span>Atelier Residence</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{settings.address}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground font-light">
                  Send an Enquiry
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] tracking-wider uppercase font-semibold text-foreground">
                        Your Name
                      </Label>
                      <Input
                        type="text"
                        required
                        placeholder="e.g. Lady Vivienne"
                        className="text-xs h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] tracking-wider uppercase font-semibold text-foreground">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        required
                        placeholder="e.g. vivienne@luxury.com"
                        className="text-xs h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] tracking-wider uppercase font-semibold text-foreground">
                      Subject of Interest
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g. Bespoke Solitaire / Sizing Inquiry"
                      className="text-xs h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] tracking-wider uppercase font-semibold text-foreground">
                      Message
                    </Label>
                    <Textarea
                      rows={4}
                      required
                      placeholder="How may our concierge assist your discovery?"
                      className="text-xs resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    className="px-8 py-2.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] font-medium rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
