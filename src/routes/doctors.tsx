import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { DoctorCard, TeamCard } from "@/components/site/Cards";
import { AppointmentSection, Notice, Wrap } from "@/components/site/Sections";

export const Route = createFileRoute("/doctors")({
  head: () => seo("Our Doctors | Drishti Eye Care, Bhopal", "Meet the eye care specialists at Drishti Eye Care in Bhopal."),
  component: Doctors,
});

function Doctors() {
  const { doctors, team, text } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Our Doctors" title="The people behind your care." text="Qualified professionals who listen, explain and care." />
      <section className="py-20">
        <Wrap>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d, i) => <Reveal key={i} delay={i * 80}><DoctorCard {...d} /></Reveal>)}
          </div>
          {!doctors.length && <Notice>Verified doctor profiles will be available soon.</Notice>}
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
      <AppointmentSection />
    </>
  );
}
