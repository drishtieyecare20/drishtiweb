import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Navigation, CheckCircle2, Info } from "lucide-react";
import { cataractSymptoms, images, useSiteContent } from "@/data/site";
import { AppointmentForm } from "./AppointmentForm";
import { ctaClass } from "./Buttons";
import { Reveal } from "./Reveal";

export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 flex items-start gap-2 rounded-xl border border-dashed border-primary/30 bg-secondary/50 px-4 py-3 text-sm text-secondary-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />{children}
    </p>
  );
}

export function CataractSection() {
  return (
    <section className="py-20 sm:py-28">
      <Wrap className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={images.cataract} alt="Doctor examining an elderly patient's eye for cataract" loading="lazy" width={1408} height={1008} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
          <div className="absolute -bottom-6 right-6 hidden rounded-2xl bg-background p-5 shadow-lift sm:block">
            <p className="eyebrow">Cataract Care</p>
            <p className="mt-1 font-display text-lg text-primary-deep">Early checks, clearer choices.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Cataract Care</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary-deep sm:text-4xl lg:text-5xl">See the World Clearly Again.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Cataracts develop gradually and are common with age. A timely eye examination helps understand how your vision is affected and what options may suit you.
          </p>
          <h3 className="mt-8 font-sans text-sm font-bold uppercase tracking-widest text-primary-deep">Common signs to watch for</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {cataractSymptoms.map((s) => (
              <li key={s} className="flex gap-2.5 text-sm text-foreground/85"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand-red" />{s}</li>
            ))}
          </ul>
          <Link to="/contact" hash="appointment" className={ctaClass({ size: "lg", className: "mt-9" })}>Book a Cataract Consultation</Link>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function AppointmentSection() {
  const { contact } = useSiteContent();
  return (
    <section id="appointment" className="scroll-mt-28 bg-primary-deep py-20 text-primary-foreground sm:py-28">
      <Wrap className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="eyebrow">Appointments</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">Take the First Step Towards Better Vision.</h2>
          <p className="mt-5 text-lg opacity-80">Book your consultation with Drishti Eye Care today.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className={ctaClass({ variant: "light" })}><Phone className="h-4 w-4" />Call Now</a>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className={ctaClass({ variant: "whatsapp" })}><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
          <div className="mt-10 grid gap-2 text-sm opacity-80">
            {contact.phones.map((p) => <span key={p} className="flex items-center gap-2"><Phone className="h-4 w-4" />{p}</span>)}
          </div>
        </Reveal>
        <Reveal delay={100} className="text-foreground"><AppointmentForm /></Reveal>
      </Wrap>
    </section>
  );
}

export function ContactSection() {
  const { contact } = useSiteContent();
  return (
    <section className="py-20 sm:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="eyebrow">Visit Us</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary-deep sm:text-4xl">We're here to help.</h2>
          <div className="mt-8 grid gap-6">
            <div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><MapPin className="h-5 w-5" /></span>
              <div><p className="font-semibold text-primary-deep">{contact.name}</p>{contact.addressLines.map((l) => <p key={l} className="text-muted-foreground">{l}</p>)}</div></div>
            <div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Phone className="h-5 w-5" /></span>
              <div>{contact.phones.map((p) => <p key={p} className="font-semibold text-primary-deep">{p}</p>)}</div></div>
          </div>
          {contact.openingHours && <p className="mt-6 text-sm text-muted-foreground">{contact.openingHours}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className={ctaClass({})}><Phone className="h-4 w-4" />Call</a>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className={ctaClass({ variant: "whatsapp" })}><MessageCircle className="h-4 w-4" />WhatsApp</a>
            <a href={contact.directionsHref} target="_blank" rel="noreferrer" className={ctaClass({ variant: "outline" })}><Navigation className="h-4 w-4" />Directions</a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <iframe title="Drishti Eye Care location map" src={contact.mapEmbed} loading="lazy" className="h-[360px] w-full rounded-3xl border shadow-soft lg:h-full lg:min-h-[420px]" />
        </Reveal>
      </Wrap>
    </section>
  );
}
