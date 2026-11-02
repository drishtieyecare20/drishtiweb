import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, UserRound, Quote } from "lucide-react";
import type { IconName } from "@/data/site";
import { Icon } from "./Icon";

export function ServiceCard({ id, icon, title, text, image }: { id?: string | null; icon: IconName; title: string; text: string; image?: string | null; details?: string }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      {image && <img src={image} alt={title} className="mb-5 aspect-video w-full rounded-lg object-cover" loading="lazy" />}
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-sans text-lg font-bold text-primary-deep">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      {id ? (
        <Link to="/eye-care/$id" params={{ id }} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link to="/contact" hash="appointment" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Enquire <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </article>
  );
}

export function FeatureCard({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-background p-6 shadow-soft transition-shadow hover:shadow-lift">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-brand-red/20 text-brand-red">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-base font-bold text-primary-deep">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

export function DoctorCard({ id, name, specialization, bio, photo, qualifications, verified = false }: { id?: string | null; name: string; specialization: string; bio: string; photo: string | null; qualifications?: string; verified?: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="relative grid aspect-[4/3] place-items-center bg-secondary">
        {photo ? <img src={photo} alt={name} className="h-full w-full object-cover" loading="lazy" /> : <UserRound className="h-20 w-20 text-primary/30" strokeWidth={1.2} />}
        {!verified && <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-red">Placeholder</span>}
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">{specialization}</p>
        <h3 className="mt-2 text-xl font-semibold text-primary-deep">{name}</h3>
        {qualifications && <p className="mt-2 text-sm font-medium">{qualifications}</p>}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{bio}</p>
        {id ? <Link to="/doctors/$id" params={{ id }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">View Profile <ArrowRight className="h-4 w-4" /></Link>
          : <Link to="/contact" hash="appointment" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Book Consultation <ArrowRight className="h-4 w-4" /></Link>}
      </div>
    </article>
  );
}

export function TestimonialCard({ name, source, rating, text, verified = false }: { name: string; source: string; rating: number; text: string; verified?: boolean }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border bg-card p-7 shadow-soft">
      <Quote className="h-8 w-8 text-brand-red/30" />
      <div className="mt-3 flex gap-0.5" aria-label={`${rating} out of 5`}>
        {Array.from({ length: rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
      </div>
      <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-foreground/85">“{text}”</blockquote>
      <figcaption className="mt-6 border-t pt-4">
        <p className="font-semibold text-primary-deep">{name}</p>
        <p className="text-xs text-muted-foreground">{source}{!verified ? ' · placeholder' : ''}</p>
      </figcaption>
    </figure>
  );
}

export function TeamCard({ name, role, bio, photo }: { name: string; role: string; bio: string; photo: string | null }) {
  return (
    <article className="h-full overflow-hidden rounded-2xl border bg-card text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="grid aspect-square place-items-center bg-secondary">
        {photo ? <img src={photo} alt={name} className="h-full w-full object-cover" loading="lazy" /> : <UserRound className="h-16 w-16 text-primary/30" strokeWidth={1.2} />}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-primary-deep">{name}</h3>
        {role && <p className="mt-1 text-xs font-bold uppercase tracking-widest text-brand-red">{role}</p>}
        {bio && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bio}</p>}
      </div>
    </article>
  );
}
