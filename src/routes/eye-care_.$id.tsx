import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { DetailHero, EnquiryCard, NotFoundBlock, Paragraphs } from "@/components/site/Detail";
import { AppointmentSection, Notice, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/eye-care_/$id")({
  head: () => seo("Eye Care Service Details | Drishti Eye Care, Bhopal", "Full details about this eye care service at Drishti Eye Care, Bhopal, and how to book a consultation."),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { id } = Route.useParams();
  const { eyeServices } = useSiteContent();
  const service = eyeServices.find((s) => s.id === id);
  const back = { to: "/eye-care" as const, label: "All eye care services" };
  if (!service) return <NotFoundBlock what="service" back={back} />;
  const others = eyeServices.filter((s) => s.id !== id).slice(0, 5);
  return (
    <>
      <DetailHero eyebrow="Eye Care Service" title={service.title} text={service.text} back={back} />
      <section className="py-16 sm:py-20">
        <Wrap className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <article>
            {service.image && <img src={service.image} alt={service.title} className="mb-8 aspect-video w-full rounded-3xl object-cover shadow-soft" />}
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <Paragraphs text={service.details || service.text} />
            </div>
            <Notice>Treatment suitability is decided only after an eye examination. Please consult our doctors for advice about your eyes.</Notice>
          </article>
          <div className="grid h-fit gap-6">
            <EnquiryCard />
            {others.length > 0 && (
              <nav className="rounded-2xl border bg-tint p-6" aria-label="Other services">
                <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-primary-deep">Other Services</h2>
                <ul className="mt-4 grid gap-1">
                  {others.map((o) => o.id && (
                    <li key={o.id}><Link to="/eye-care/$id" params={{ id: o.id }} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-background hover:text-primary">{o.title}<ArrowRight className="h-4 w-4 shrink-0" /></Link></li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </Wrap>
      </section>
      <AppointmentSection />
    </>
  );
}
