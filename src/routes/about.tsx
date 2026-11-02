import { createFileRoute } from "@tanstack/react-router";
import { images, whyChoose, useSiteContent } from "@/data/site";
import { Paragraphs } from "@/components/site/Detail";
import { seo } from "@/lib/seo";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { FeatureCard } from "@/components/site/Cards";
import { AppointmentSection, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us | Drishti Eye Care, Bhopal", "Learn about Drishti Eye Care — accessible, compassionate eye care in Bhopal with modern diagnostics and a patient-first approach."),
  component: About,
});

function About() {
  const { text } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="About Us" title={text("about.heroTitle")} text={text("about.heroText")} />
      <section className="py-20">
        <Wrap className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal><img src={images.reception} alt="Drishti Eye Care reception" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" /></Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <Paragraphs text={text("about.body")} />
          </Reveal>
        </Wrap>
      </section>
      {(text("about.mission") || text("about.vision")) && (
        <section className="pb-20">
          <Wrap className="grid gap-6 md:grid-cols-2">
            {[["Our Mission", text("about.mission")], ["Our Vision", text("about.vision")]].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="rounded-3xl border-l-4 border-brand-red bg-tint p-8"><h2 className="text-2xl font-semibold text-primary-deep">{k}</h2><p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{v}</p></div>
            ))}
          </Wrap>
        </section>
      )}
      <section className="bg-tint py-20">
        <Wrap>
          <SectionHeading eyebrow="Our Approach" title={text("about.approachTitle")} center />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => <FeatureCard key={w.title} {...w} />)}
          </div>
        </Wrap>
      </section>
      <AppointmentSection />
    </>
  );
}
