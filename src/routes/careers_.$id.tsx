import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Award, Building2 } from "lucide-react";
import { useSiteContent } from "@/data/site";
import { seo } from "@/lib/seo";
import { DetailHero, NotFoundBlock, Paragraphs } from "@/components/site/Detail";
import { Wrap } from "@/components/site/Sections";
import { JobApplicationForm } from "@/components/site/JobApplicationForm";

export const Route = createFileRoute("/careers_/$id")({
  head: () => seo("Job Opening | Careers at Drishti Eye Care, Bhopal", "Role details, requirements and online application for a job opening at Drishti Eye Care, Bhopal."),
  component: JobDetail,
});

function JobDetail() {
  const { id } = Route.useParams();
  const { jobs } = useSiteContent();
  const job = jobs.find((j) => j.id === id);
  const back = { to: "/careers" as const, label: "All openings" };
  if (!job) return <NotFoundBlock what="job opening" back={back} />;
  const facts = [
    { icon: Building2, label: "Department", value: job.department },
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Clock, label: "Job type", value: job.type },
    { icon: Award, label: "Experience", value: job.experience },
  ].filter((f) => f.value);
  return (
    <>
      <DetailHero eyebrow="Job Opening" title={job.title} text={job.summary} back={back} />
      <section className="py-16 sm:py-20">
        <Wrap className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <article>
            <dl className="grid gap-4 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="flex gap-3 rounded-2xl border bg-tint p-4">
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                  <div><dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{f.label}</dt><dd className="mt-1 font-semibold text-primary-deep">{f.value}</dd></div>
                </div>
              ))}
            </dl>
            {job.details && <><h2 className="mt-10 text-2xl font-semibold text-primary-deep">About the role</h2><div className="mt-4 space-y-3 leading-relaxed text-muted-foreground"><Paragraphs text={job.details} /></div></>}
            {job.requirements && <><h2 className="mt-10 text-2xl font-semibold text-primary-deep">Requirements</h2>
              <ul className="mt-4 grid gap-2 text-muted-foreground">{job.requirements.split("\n").map((r) => r.trim()).filter(Boolean).map((r) => <li key={r} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />{r}</li>)}</ul></>}
          </article>
          <div id="apply" className="scroll-mt-28">
            <h2 className="mb-5 text-2xl font-semibold text-primary-deep">Apply for this role</h2>
            <JobApplicationForm jobs={jobs.map((j) => ({ id: j.id, title: j.title }))} initialJob={job.id} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
