import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, CalendarCheck, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/data/site";

const quick = [
  { to: "/eye-care", label: "Eye Care" },
  { to: "/doctors", label: "Doctors" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const { contact, logoUrl } = useSiteContent();
  return (
    <>
      <footer className="border-t bg-tint pb-24 md:pb-0">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="inline-block rounded-2xl bg-background p-3 shadow-soft">
              <img src={logoUrl} alt="Drishti Eye Care logo" className="h-16 w-auto" loading="lazy" width={1149} height={561} />
            </div>
            <p className="mt-5 max-w-xs font-display text-lg italic text-primary-deep">{contact.tagline}</p>
            <div className="mt-6 flex gap-3">
              {[{ icon: Facebook, label: 'Facebook', url: contact.facebook }, { icon: Instagram, label: 'Instagram', url: contact.instagram }, { icon: Youtube, label: 'YouTube', url: contact.youtube }].filter(s => typeof s.url === 'string' && s.url).map(({ icon: I, label, url }) => (
                <a key={label} href={String(url)} aria-label={label} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border bg-background text-primary transition-colors hover:border-primary">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary-deep">Quick Links</h3>
            <ul className="mt-4 grid gap-2.5">
              {quick.map((q) => (
                <li key={q.to}><Link to={q.to} className="text-muted-foreground hover:text-primary">{q.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary-deep">Contact</h3>
            <p className="mt-4 flex gap-3 text-muted-foreground"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" /><span>{contact.addressLines.join(", ")}</span></p>
            <p className="mt-3 flex gap-3 text-muted-foreground"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" /><span>{contact.phones.join(" / ")}</span></p>
            {contact.openingHours && <p className="mt-3 text-sm text-muted-foreground">{contact.openingHours}</p>}
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-muted-foreground sm:px-8"><p>© {new Date().getFullYear()} {contact.name}. All Rights Reserved.</p><Link to="/admin/login" className="text-xs hover:text-primary">Administrator</Link></div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-background shadow-lift md:hidden">
        <a href={contact.phoneHref} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-primary"><Phone className="h-5 w-5" />Call</a>
        <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-whatsapp"><MessageCircle className="h-5 w-5" />WhatsApp</a>
        <Link to="/contact" hash="appointment" className="flex flex-col items-center gap-1 bg-brand-red py-3 text-xs font-semibold text-brand-red-foreground"><CalendarCheck className="h-5 w-5" />Book Appointment</Link>
      </div>
    </>
  );
}
