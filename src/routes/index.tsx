import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, CalendarCheck, Stethoscope, UserRound, Phone, Briefcase } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { lines, parseStats } from "@/data/pages";
import { WatchLearn } from "@/components/site/WatchLearn";
import { HeroSlider } from "@/components/site/HeroSlider";
import { seo } from "@/lib/seo";
import { ctaClass } from "@/components/site/Buttons";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { DoctorCard, TeamCard, FeatureCard, ServiceCard, TestimonialCard } from "@/components/site/Cards";
import { JobCard } from "@/components/site/JobCard";
import { Gallery } from "@/components/site/Gallery";
import { AppointmentSection, CataractSection, ContactSection, Wrap } from "@/components/site/Sections";
import { Paragraphs } from "@/components/site/Detail";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Drishti Eye Care | Eye Hospital in Bhopal",
      "Drishti Eye Care provides compassionate and affordable eye care in Bhopal with modern diagnostic facilities and patient-focused treatment.",
    ),
  component: Home,
});

function QuickActions() {
  const { contact } = useSiteContent();
  const items = [
    { icon: CalendarCheck, title: "Book Appointment", text: "Request a convenient visit", link: <Link to="/contact" hash="appointment" className="absolute inset-0" aria-label="Book Appointment" /> },
    { icon: UserRound, title: "Find a Doctor", text: "Meet our eye specialists", link: <Link to="/doctors" className="absolute inset-0" aria-label="Find a Doctor" /> },
    { icon: Stethoscope, title: "Our Specialities", text: "Explore eye care services", link: <Link to="/eye-care" className="absolute inset-0" aria-label="Our Specialities" /> },
    { icon: Phone, title: "Call Us", text: contact.phones[0] ?? "", link: <a href={contact.phoneHref} className="absolute inset-0" aria-label="Call Us" /> },
  ];
  return (
    <section className="relative z-10 -mt-10 sm:-mt-14">
      <Wrap>
        <div className="grid overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.title} className={`group relative flex items-center gap-4 p-6 transition-colors hover:bg-primary-deep ${i === 0 ? "bg-brand-red hover:bg-brand-red" : ""}`}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-foreground/15"><it.icon className="h-6 w-6" /></span>
              <div className="min-w-0"><p className="font-bold">{it.title}</p><p className="truncate text-sm opacity-80">{it.text}</p></div>
              <ArrowRight className="ml-auto h-5 w-5 shrink-0 opacity-60 transition-transform group-hover:translate-x-1" />
              {it.link}
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Home() {
  const { doctors, team, eyeServices, images, testimonials, whyChoose, jobs, text } = useSiteContent();
  const stats = parseStats(text("home.stats"));
  return (
    <>
      <HeroSlider />
      <QuickActions />

      <section className="border-b">
        <Wrap>
          <ul className="grid gap-3 py-8 text-sm font-semibold text-primary-deep sm:grid-cols-3">
            {lines(text("home.highlights")).slice(0, 6).map((t) => (
              <li key={t} className="flex items-center justify-center gap-2"><Check className="h-4 w-4 shrink-0 text-brand-red" />{t}</li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28">
        <Wrap className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative grid grid-cols-5 gap-4">
            <img src={images.reception} alt="Reception and waiting area" loading="lazy" className="col-span-3 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
            <img src={images.patientCare} alt="Child trying on new spectacles" loading="lazy" className="col-span-2 mt-12 aspect-[2/3.4] w-full rounded-3xl object-cover shadow-soft" />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">{text("home.aboutEyebrow")}</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary-deep sm:text-4xl lg:text-5xl">{text("home.aboutTitle")}</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground"><Paragraphs text={text("home.aboutText")} /></div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className={ctaClass({ size: "lg" })}>Read More About Us</Link>
              <Link to="/contact" hash="appointment" className={ctaClass({ size: "lg", variant: "outline" })}>Book a Visit</Link>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {stats.length > 0 && (
        <section className="bg-primary-deep py-14 text-primary-foreground">
          <Wrap className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}><p className="font-display text-4xl font-semibold sm:text-5xl">{s.value}</p><p className="mt-2 text-sm uppercase tracking-widest opacity-80">{s.label}</p></div>
            ))}
          </Wrap>
        </section>
      )}

      {/* Specialities */}
      <section className="bg-tint py-20 sm:py-28">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Specialities" title={text("home.servicesTitle")} text={text("home.servicesText")} />
            <Link to="/eye-care" className={ctaClass({ variant: "outline" })}>View All Services <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eyeServices.slice(0, 8).map((s, i) => <Reveal key={s.id ?? s.title} delay={(i % 4) * 60}><ServiceCard {...s} /></Reveal>)}
          </div>
          {!eyeServices.length && <p className="mt-6 text-muted-foreground">Please contact our team for current eye-care services.</p>}
        </Wrap>
      </section>

      {/* Why choose */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <SectionHeading eyebrow="Why Drishti" title={text("home.whyTitle")} center />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => <Reveal key={w.title} delay={i * 60}><FeatureCard {...w} /></Reveal>)}
          </div>
        </Wrap>
      </section>

      <div className="bg-tint"><CataractSection /></div>

      {/* Doctors */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Specialists" title={text("home.doctorsTitle")} text={text("home.doctorsText")} />
            <Link to="/doctors" className={ctaClass({ variant: "outline" })}>All Doctors <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.slice(0, 6).map((d, i) => <Reveal key={d.id ?? i} delay={i * 80}><DoctorCard {...d} /></Reveal>)}
          </div>
          {!doctors.length && <p className="mt-6 text-muted-foreground">Verified doctor profiles will be available soon.</p>}
        </Wrap>
      </section>

      {team.length > 0 && (
        <section className="bg-tint py-20 sm:py-28">
          <Wrap>
            <SectionHeading eyebrow="Our Team" title={text("home.teamTitle")} text={text("home.teamText")} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => <Reveal key={m.id} delay={i * 60}><TeamCard {...m} /></Reveal>)}
            </div>
          </Wrap>
        </section>
      )}

      {/* Facilities preview */}
      <section className="bg-tint py-20 sm:py-28">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Facilities" title={text("home.facilitiesTitle")} />
            <Link to="/facilities" className={ctaClass({ variant: "outline" })}>Explore Facilities <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12"><Gallery filters={false} limit={6} /></div>
        </Wrap>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <Wrap>
          <SectionHeading eyebrow="Patient Stories" title={text("home.testimonialsTitle")} center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => <Reveal key={i} delay={i * 80}><TestimonialCard {...t} /></Reveal>)}
          </div>
          {!testimonials.length && <p className="mt-6 text-center text-muted-foreground">Patient reviews will appear here after verification and consent.</p>}
        </Wrap>
      </section>

      <WatchLearn />

      {/* Work with us */}
      <section className="bg-tint py-20 sm:py-28">
        <Wrap>
          <div className="grid items-center gap-8 rounded-3xl bg-primary p-8 text-primary-foreground shadow-lift sm:p-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-red-soft"><Briefcase className="h-4 w-4" />Careers</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{text("home.careersTitle")}</h2>
              <p className="mt-4 max-w-xl text-lg opacity-85">{text("home.careersText")}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/careers" className={ctaClass({ variant: "light", size: "lg" })}>View Openings</Link>
              <Link to="/careers" hash="apply" className={ctaClass({ variant: "ghostLight", size: "lg" })}>Apply Now</Link>
            </div>
          </div>
          {jobs.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.slice(0, 3).map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          )}
        </Wrap>
      </section>

      <AppointmentSection />
      <ContactSection />
    </>
  );
}
