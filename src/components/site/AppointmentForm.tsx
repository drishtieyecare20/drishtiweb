import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { ctaClass } from "./Buttons";
import { useServerFn } from '@tanstack/react-start';
import { submitAppointment } from '@/lib/cms/public.functions';
import { Button } from '@/components/ui/button';

const field = "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

export function AppointmentForm() {
  const save = useServerFn(submitAppointment);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\D/g, "");
    const email = String(f.get("email") || "").trim();
    const date = String(f.get("date") || "");
    const time = String(f.get("time") || "");
    const reason = String(f.get("reason") || "");

    if (name.length < 2) return setErr("Please enter your full name.");
    if (phone.length < 10) return setErr("Please enter a valid 10-digit phone number.");
    setErr(null);
    setBusy(true);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '82e8d1a6-914a-4558-92c4-0afa8a22ca6c';
      
      // Send directly from the browser to Web3Forms (bypasses server restrictions)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `🏥 New Appointment Request from ${name}`,
          from_name: 'Drishti Eye Care Website',
          'Patient Name': name,
          'Phone Number': phone,
          'Email': email || 'Not provided',
          'Preferred Date': date || 'Not specified',
          'Preferred Time': time || 'Not specified',
          'Reason for Visit': reason || 'Not provided',
        }),
      });

      const resData = await res.json().catch(() => null);

      // Also attempt server-side save to Supabase if configured
      try {
        await save({
          data: {
            patient_name: name,
            phone,
            email,
            preferred_date: date,
            preferred_time: time,
            reason,
          },
        });
      } catch {
        // Supabase is optional; ignore if service role key is not configured
      }

      if (res.ok && resData?.success) {
        setDone(name);
      } else {
        setErr(resData?.message || 'Your request could not be sent. Please call the clinic directly.');
      }
    } catch {
      setErr('Please check your network and try again, or call the clinic.');
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div className="rounded-3xl bg-background p-8 text-center shadow-lift sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" strokeWidth={1.5} />
        <h3 className="mt-4 text-2xl font-semibold text-primary-deep">Thank you, {done}.</h3>
        <p className="mt-2 text-muted-foreground">Your appointment request has been received. Our team will call you shortly to confirm your visit.</p>
        <Button onClick={() => setDone(null)} className={ctaClass({ variant: "outline", className: "mt-6" })}>Book another</Button>
      </div>
    );

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-background p-6 shadow-lift sm:grid-cols-2 sm:p-8" noValidate>
      <label className="grid gap-1.5 text-sm font-medium">Name<input name="name" required maxLength={80} className={field} placeholder="Your full name" /></label>
      <label className="grid gap-1.5 text-sm font-medium">Phone Number<input name="phone" type="tel" required maxLength={15} className={field} placeholder="10-digit mobile" /></label>
      <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Email<input name="email" type="email" maxLength={120} className={field} placeholder="you@example.com" /></label>
      <label className="grid gap-1.5 text-sm font-medium">Preferred Date<input name="date" type="date" className={field} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Preferred Time
        <select name="time" className={field} defaultValue="">
          <option value="" disabled>Select a time</option>
          <option>Morning (10 AM – 1 PM)</option>
          <option>Afternoon (1 PM – 4 PM)</option>
          <option>Evening (4 PM – 8 PM)</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Reason for Visit<textarea name="reason" rows={3} maxLength={500} className={`${field} h-auto py-3`} placeholder="E.g. routine eye check-up, blurry vision…" /></label>
      {err && <p className="text-sm font-medium text-destructive sm:col-span-2">{err}</p>}
      <Button type="submit" disabled={busy} className={ctaClass({ variant: "red", size: "lg", className: "sm:col-span-2" })}>{busy ? 'Saving your request…' : 'Request Appointment'}</Button>
    </form>
  );
}
