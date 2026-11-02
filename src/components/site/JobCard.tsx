import { Link } from "@tanstack/react-router";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export function JobCard({ job }: { job: { id: string; title: string; summary: string; department: string; location: string; type: string } }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      {job.department && <p className="text-xs font-bold uppercase tracking-widest text-brand-red">{job.department}</p>}
      <h3 className="mt-2 font-sans text-xl font-bold text-primary-deep">{job.title}</h3>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{job.type}</span>
      </div>
      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
      <Link to="/careers/$id" params={{ id: job.id }} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">View Details & Apply <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
    </article>
  );
}

