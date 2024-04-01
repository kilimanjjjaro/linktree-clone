import LinkAvatar from "@/components/links/settings/profile/avatar/link-avatar";
import LinkName from "@/components/links/settings/profile/name/link-name";
import LinkDescription from "@/components/links/settings/profile/description/link-description";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import { Separator } from "@/components/ui/separator";
import LinkSocialMedia from "./profile/social-media/link-social-media";

export default function LinkSettings() {
  return (
    <aside className="h-full w-96">
      <section className="overflow-hidden rounded-2xl border border-border bg-background">
        <div className="h-12 border-b border-b-border p-3 text-center">
          <TypographyH3>Profile</TypographyH3>
        </div>
        <LinkAvatar />
        <Separator />
        <LinkName />
        <Separator />
        <LinkDescription />
        <Separator />
        <LinkSocialMedia />
      </section>
    </aside>
  );
}
