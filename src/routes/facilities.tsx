import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { AppointmentSection, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/facilities")({
  head: () => seo("Facilities & Technology | Drishti Eye Care", "Modern diagnostic equipment, examination rooms and comfortable patient facilities at Drishti Eye Care, Bhopal."),
  component: Facilities,
});

function Facilities() {
  const { facilities, text } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Facilities" title={text("facilities.heroTitle")} text={text("facilities.heroText")} />
      <section className="py-20">
        <Wrap className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {facilities.map((f, i) => (
            <Reveal key={f.id ?? f.title} delay={(i % 3) * 80} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <article className="group overflow-hidden rounded-3xl border bg-card shadow-soft">
                <div className="overflow-hidden"><img src={f.src} alt={f.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-primary-deep">{f.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </Wrap>
      </section>
      <AppointmentSection />
    </>
  );
}
