import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { CalendarCheck, Clock, Stethoscope, Users, Image, Youtube, Plus, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { listContent } from '@/lib/cms/admin-client';

export function Dashboard() {
  const { data, isPending, error, refetch } = useQuery({ queryKey: ['admin-stats'], queryFn: async () => {
    const counts = await Promise.all([
      supabase.from('appointments').select('id', { count: 'exact', head: true }),
      supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'New'),
      ...['services','doctors','gallery','youtube'].map(kind => supabase.from('content').select('id', { count: 'exact', head: true }).eq('kind', kind).eq('published', true)),
    ]);
    if (counts.some(r => r.error)) throw new Error('Statistics could not be loaded.');
    const appointments = await supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(5); if (appointments.error) throw appointments.error;
    const content = await listContent();
    return { counts: counts.map(r => r.count ?? 0), appointments: appointments.data, content: content.sort((a,b) => b.updated_at.localeCompare(a.updated_at)).slice(0,5) };
  } });
  const labels = ['Total Appointments','New Appointments','Published Services','Active Doctors','Gallery Images','Published Videos']; const icons = [CalendarCheck, Clock, Stethoscope, Users, Image, Youtube];
  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Clinic overview</p><h1 className="mt-2 text-3xl text-primary-deep">Dashboard</h1></div><Button asChild><Link to="/admin/slideshow"><Plus />Add Slide</Link></Button></div>
    {error ? <div role="alert" className="py-12"><p>Dashboard data could not be loaded.</p><Button className="mt-4" onClick={() => void refetch()}>Try Again</Button></div> : <>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{labels.map((label,i) => { const Icon = icons[i] ?? CalendarCheck; return <div key={label} className="rounded-lg border bg-card p-6 shadow-soft"><div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{label}</p><Icon className={`h-5 w-5 ${i === 1 ? 'text-brand-red' : 'text-primary'}`} /></div><p className="mt-4 text-4xl font-semibold text-primary-deep">{isPending ? '—' : data?.counts[i]}</p></div>; })}</div>
    <div className="mt-12 grid gap-10 xl:grid-cols-2"><section><div className="flex items-center justify-between border-b pb-4"><h2 className="text-xl">Recent Appointments</h2><Button asChild variant="ghost" size="sm"><Link to="/admin/appointments">View All<ArrowUpRight /></Link></Button></div>{isPending ? <p className="py-8">Loading…</p> : data?.appointments.length ? <div className="divide-y">{data.appointments.map(r => <Link key={r.id} to="/admin/appointments" className="flex items-center justify-between gap-4 py-5"><div><p className="font-semibold">{r.patient_name}</p><p className="mt-1 text-sm text-muted-foreground">{r.phone} · {new Date(r.created_at).toLocaleDateString()}</p></div><span className="text-xs font-bold text-primary">{r.status}</span></Link>)}</div> : <p className="py-10 text-sm text-muted-foreground">No appointment requests yet.</p>}</section>
    <section><h2 className="border-b pb-4 text-xl">Recently Updated Content</h2>{isPending ? <p className="py-8">Loading…</p> : data?.content.length ? <div className="divide-y">{data.content.map(r => <div key={r.id} className="flex items-center justify-between gap-4 py-5"><div><p className="font-semibold">{r.title}</p><p className="mt-1 text-sm capitalize text-muted-foreground">{r.kind} · {new Date(r.updated_at).toLocaleDateString()}</p></div><span className="text-xs text-muted-foreground">{r.published ? 'Published' : 'Draft'}</span></div>)}</div> : <p className="py-10 text-sm text-muted-foreground">No content updates yet.</p>}</section></div>
    <section className="mt-10 border-t pt-8"><h2 className="mb-5 text-xl">Quick Actions</h2><div className="flex flex-wrap gap-3"><Button asChild variant="outline"><Link to="/admin/youtube"><Youtube />Add Video</Link></Button><Button asChild variant="outline"><Link to="/admin/gallery"><Image />Upload Photos</Link></Button><Button asChild variant="outline"><Link to="/admin/services"><Stethoscope />Manage Services</Link></Button><Button asChild variant="outline"><Link to="/admin/settings">Website Settings<ArrowUpRight /></Link></Button></div></section></>}
  </>;
}