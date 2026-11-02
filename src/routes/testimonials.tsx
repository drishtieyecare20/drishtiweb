import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { TestimonialCard } from "@/components/site/Cards";
import { AppointmentSection, Notice, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/testimonials")({
  head: () => seo("Patient Testimonials | Drishti Eye Care", "What patients say about their experience at Drishti Eye Care, Bhopal."),
  component: Testimonials,
});

function Testimonials() {
  const { testimonials } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Trusted by Our Patients" text="Real experiences from the families we care for." />
      <section className="py-20">
        <Wrap>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => <Reveal key={i} delay={i * 80}><TestimonialCard {...t} /></Reveal>)}
          </div>
          {!testimonials.length && <Notice>Patient reviews will appear here after verification and consent.</Notice>}
        </Wrap>
      </section>
      <AppointmentSection />
    </>
  );
}
