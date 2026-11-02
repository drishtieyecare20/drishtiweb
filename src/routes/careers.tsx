import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { JobCard } from "@/components/site/JobCard";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { PageHero, Reveal, SectionHeading } from "@/components/site/Reveal";
import { Wrap } from "@/components/site/Sections";
import { JobApplicationForm } from "@/components/site/JobApplicationForm";

export const Route = createFileRoute("/careers")({
  head: () => seo("Careers – Work With Us | Drishti Eye Care, Bhopal", "Current job openings at Drishti Eye Care, Bhopal. View roles and apply online to join our eye care team."),
  component: Careers,
});

function Careers() {
  const { jobs, text } = useSiteContent();
  return (
    <>
      <PageHero eyebrow="Work With Us" title={text("careers.heroTitle")} text={text("careers.heroText")} />
      <section className="py-20">
        <Wrap>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{text("careers.intro")}</p>
          <SectionHeading eyebrow="Openings" title="Current Openings" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j, i) => <Reveal key={j.id} delay={(i % 3) * 60}><JobCard job={j} /></Reveal>)}
          </div>
          {!jobs.length && (
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-dashed bg-tint p-6 text-muted-foreground">
              <Briefcase className="h-8 w-8 shrink-0 text-primary/50" />There are no open positions right now. You can still send a general application below.
            </div>
          )}
        </Wrap>
      </section>
      <section id="apply" className="scroll-mt-28 bg-tint py-20">
        <Wrap className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Apply" title="Send your application" text="Share your details and our team will get in touch if there is a suitable role." />
          <JobApplicationForm jobs={jobs.map((j) => ({ id: j.id, title: j.title }))} />
        </Wrap>
      </section>
    </>
  );
}
