import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/Cards";
import { AppointmentSection, CataractSection, Notice, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/eye-care")({
  head: () => seo("Eye Care Services in Bhopal | Drishti Eye Care", "Comprehensive eye examinations, cataract evaluation, glaucoma, retina, diabetic and pediatric eye care at Drishti Eye Care, Bhopal."),
  component: EyeCare,
});

function EyeCare() {
  const { eyeServices } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Eye Care" title="Our Eye Care Services" text="Thorough examinations and considerate care for every stage of life." />
      <section className="py-20">
        <Wrap>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eyeServices.map((s, i) => <Reveal key={s.title} delay={(i % 4) * 60}><ServiceCard {...s} /></Reveal>)}
          </div>
          {!eyeServices.length && <p className="mt-6 text-muted-foreground">Please contact our team for current service availability.</p>}
          <Notice>Service availability may vary. Please call us to confirm a specific treatment before your visit.</Notice>
        </Wrap>
      </section>
      <div className="bg-tint"><CataractSection /></div>
      <AppointmentSection />
    </>
  );
}
