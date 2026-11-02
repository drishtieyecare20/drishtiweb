import { Link } from "@tanstack/react-router";
import { ArrowLeft, Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { ctaClass } from "./Buttons";
import { Wrap } from "./Sections";

export function DetailHero({ eyebrow, title, text, back }: { eyebrow: string; title: string; text?: string; back: { to: "/eye-care" | "/doctors" | "/careers"; label: string } }) {
  return (
    <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,var(--primary),transparent_55%)] opacity-60" aria-hidden />
      <Wrap className="relative py-14 sm:py-20">
        <Link to={back.to} className="inline-flex items-center gap-2 text-sm font-semibold opacity-80 hover:opacity-100"><ArrowLeft className="h-4 w-4" />{back.label}</Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-red-soft">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg opacity-85">{text}</p>}
      </Wrap>
    </section>
  );
}

export function Paragraphs({ text }: { text: string }) {
  return <>{text.split("\n").map((p) => p.trim()).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</>;
}

/** Sticky enquiry card shown beside every detail page. */
export function EnquiryCard({ title = "Need help or an appointment?" }: { title?: string }) {
  const { contact } = useSiteContent();
  return (
    <aside className="h-fit rounded-2xl border bg-card p-6 shadow-soft lg:sticky lg:top-32">
      <h2 className="font-sans text-lg font-bold text-primary-deep">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">Our team will guide you and confirm a convenient time.</p>
      <div className="mt-5 grid gap-3">
        <Link to="/contact" hash="appointment" className={ctaClass({ variant: "red" })}><CalendarCheck className="h-4 w-4" />Book Appointment</Link>
        <a href={contact.phoneHref} className={ctaClass({ variant: "outline" })}><Phone className="h-4 w-4" />{contact.phones[0]}</a>
        <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className={ctaClass({ variant: "whatsapp" })}><MessageCircle className="h-4 w-4" />WhatsApp</a>
      </div>
    </aside>
  );
}

export function NotFoundBlock({ what, back }: { what: string; back: { to: "/eye-care" | "/doctors" | "/careers"; label: string } }) {
  return (
    <Wrap className="py-24 text-center">
      <h1 className="text-3xl font-semibold text-primary-deep">This {what} is not available</h1>
      <p className="mt-3 text-muted-foreground">It may have been updated or removed.</p>
      <Link to={back.to} className={ctaClass({ className: "mt-8" })}>{back.label}</Link>
    </Wrap>
  );
}
