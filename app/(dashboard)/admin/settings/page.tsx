import { Metadata } from "next";
import { getSettings } from "@/lib/queries/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata: Metadata = {
  title: "Store Settings | ORÉVA Admin",
};

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl text-foreground font-light tracking-wide">
          Store & Brand Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Configure WhatsApp concierge destination number, business contact coordinates, and social media channels.
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
