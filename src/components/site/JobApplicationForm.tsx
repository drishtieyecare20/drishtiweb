import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitJobApplication } from "@/lib/cms/public.functions";
import { jobApplicationSchema } from "@/lib/cms/validation";
import { ctaClass } from "./Buttons";

const field = "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

export function JobApplicationForm({ jobs, initialJob }: { jobs: { id: string; title: string }[]; initialJob?: string }) {
  const save = useServerFn(submitJobApplication);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const jobId = String(f.get("job") || "");
    const job = jobs.find((j) => j.id === jobId);
    const parsed = jobApplicationSchema.safeParse({
      job_id: job?.id ?? null,
      position: job?.title ?? (String(f.get("position") || "").trim() || "General application"),
      full_name: String(f.get("name") || ""), phone: String(f.get("phone") || ""), email: String(f.get("email") || "").trim(),
      qualification: String(f.get("qualification") || ""), experience: String(f.get("experience") || ""),
      resume_link: String(f.get("resume") || "").trim(), message: String(f.get("message") || ""),
    });
    if (!parsed.success) {
      const path = parsed.error.issues[0]?.path[0];
      return setErr(path === "phone" ? "Please enter a valid 10-digit phone number." : path === "full_name" ? "Please enter your full name." : path === "email" ? "Please enter a valid email." : path === "resume_link" ? "CV link must start with https://" : "Please check your details.");
    }
    setErr(null); setBusy(true);
    try {
      const r = await save({ data: parsed.data });
      if (!r.success) setErr(r.error ?? "Your application could not be sent."); else setDone(true);
    } catch { setErr("Please check your details and try again, or call the clinic."); } finally { setBusy(false); }
  }

  if (done) return (
    <div className="rounded-3xl border bg-card p-10 text-center shadow-soft">
      <CheckCircle2 className="mx-auto h-14 w-14 text-primary" strokeWidth={1.5} />
      <h3 className="mt-4 text-2xl font-semibold text-primary-deep">Application received</h3>
      <p className="mt-2 text-muted-foreground">Thank you for your interest. Our team will contact you if your profile matches.</p>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl border bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8">
      <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Position
        <select name="job" defaultValue={initialJob ?? ""} className={field}>
          <option value="">General application</option>
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Full Name<input name="name" required maxLength={80} className={field} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Phone Number<input name="phone" type="tel" required maxLength={15} className={field} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Email<input name="email" type="email" maxLength={120} className={field} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Qualification<input name="qualification" maxLength={200} className={field} placeholder="E.g. B.Optom, GNM, MS Ophthalmology" /></label>
      <label className="grid gap-1.5 text-sm font-medium">Experience<input name="experience" maxLength={200} className={field} placeholder="E.g. 3 years" /></label>
      <label className="grid gap-1.5 text-sm font-medium">CV Link (optional)<input name="resume" type="url" maxLength={500} className={field} placeholder="https://drive.google.com/…" /></label>
      <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Message<textarea name="message" rows={4} maxLength={1500} className={`${field} h-auto py-3`} placeholder="Tell us briefly about yourself" /></label>
      {err && <p role="alert" className="text-sm font-medium text-destructive sm:col-span-2">{err}</p>}
      <button type="submit" disabled={busy} className={ctaClass({ variant: "red", size: "lg", className: "sm:col-span-2" })}>{busy ? "Sending…" : "Submit Application"}</button>
    </form>
  );
}
