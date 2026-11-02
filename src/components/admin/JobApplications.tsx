import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { applicationStatuses } from '@/lib/cms/validation';
import type { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ConfirmDelete } from './ConfirmDelete';

type Row = Tables<'job_applications'>;

export function JobApplications() {
  const query = useQueryClient();
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Row | null>(null); const [deleting, setDeleting] = useState<Row | null>(null); const [busy, setBusy] = useState(false);
  const { data = [], isPending, error, refetch } = useQuery({ queryKey: ['admin-applications', search, filter], queryFn: async () => {
    let q = supabase.from('job_applications').select('*').order('created_at', { ascending: false }).limit(200);
    if (filter !== 'all') q = q.eq('status', filter);
    const term = search.replace(/[^\p{L}\p{N} @.+-]/gu, '').trim();
    if (term) q = q.or(`full_name.ilike.%${term}%,phone.ilike.%${term}%,position.ilike.%${term}%`);
    const r = await q; if (r.error) throw new Error(r.error.message); return r.data;
  } });
  async function change(row: Row, status: string) {
    if (!(applicationStatuses as readonly string[]).includes(status)) return;
    const r = await supabase.from('job_applications').update({ status }).eq('id', row.id);
    if (r.error) toast.error('Status could not be saved.'); else { if (selected?.id === row.id) setSelected({ ...row, status }); await query.invalidateQueries({ queryKey: ['admin-applications'] }); toast.success('Status updated.'); }
  }
  async function remove() {
    if (!deleting) return; setBusy(true);
    const r = await supabase.from('job_applications').delete().eq('id', deleting.id); setBusy(false);
    if (r.error) toast.error('Unable to delete.'); else { setDeleting(null); setSelected(null); await query.invalidateQueries({ queryKey: ['admin-applications'] }); toast.success('Application deleted.'); }
  }
  const statusSelect = (row: Row) => <select aria-label={`Status for ${row.full_name}`} value={row.status} onChange={e => void change(row, e.target.value)} className="h-9 rounded-md border bg-background px-2 text-sm">{applicationStatuses.map(s => <option key={s}>{s}</option>)}</select>;
  return <>
    <p className="eyebrow">Careers</p><h1 className="mt-2 text-3xl text-primary-deep">Job Applications</h1>
    <div className="my-7 flex flex-wrap gap-3">
      <Input aria-label="Search applications" placeholder="Search name, phone or position…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm bg-background" />
      <select aria-label="Filter status" value={filter} onChange={e => setFilter(e.target.value)} className="rounded-md border bg-background px-3 text-sm"><option value="all">All statuses</option>{applicationStatuses.map(s => <option key={s}>{s}</option>)}</select>
    </div>
    {isPending ? <p className="py-12">Loading applications…</p> : error ? <div role="alert"><p>Applications could not be loaded.</p><Button className="mt-4" onClick={() => void refetch()}>Try Again</Button></div>
      : !data.length ? <p className="border-y py-16 text-center text-muted-foreground">No job applications yet.</p>
      : <div className="overflow-x-auto rounded-lg border bg-background"><table className="w-full min-w-[720px] text-sm"><thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Applicant</th><th className="p-3">Position</th><th className="p-3">Phone</th><th className="p-3">Received</th><th className="p-3">Status</th><th className="p-3" /></tr></thead>
        <tbody>{data.map(r => <tr key={r.id} className="border-t"><td className="p-3 font-semibold">{r.full_name}</td><td className="p-3">{r.position}</td><td className="p-3"><a href={`tel:${r.phone}`} className="text-primary">{r.phone}</a></td><td className="p-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td><td className="p-3">{statusSelect(r)}</td>
          <td className="p-3 text-right"><Button variant="ghost" size="icon" aria-label={`View ${r.full_name}`} onClick={() => setSelected(r)}><Eye /></Button><Button variant="ghost" size="icon" aria-label={`Delete ${r.full_name}`} onClick={() => setDeleting(r)}><Trash2 /></Button></td></tr>)}</tbody></table></div>}
    <Dialog open={!!selected} onOpenChange={o => { if (!o) setSelected(null); }}><DialogContent className="max-w-xl">{selected && <>
      <DialogTitle>{selected.full_name}</DialogTitle><DialogDescription>Applied for {selected.position}</DialogDescription>
      <dl className="grid gap-3 text-sm">{[['Phone', selected.phone], ['Email', selected.email], ['Qualification', selected.qualification], ['Experience', selected.experience], ['Message', selected.message]].filter(([, v]) => v).map(([k, v]) => <div key={k}><dt className="text-xs font-bold uppercase text-muted-foreground">{k}</dt><dd className="mt-1 whitespace-pre-line">{v}</dd></div>)}
        {selected.resume_link && <div><dt className="text-xs font-bold uppercase text-muted-foreground">CV</dt><dd className="mt-1"><a href={selected.resume_link} target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline">Open CV link</a></dd></div>}
      </dl>
      <div className="flex items-center justify-between gap-3 border-t pt-4">{statusSelect(selected)}<Button variant="outline" onClick={() => setDeleting(selected)}><Trash2 />Delete</Button></div>
    </>}</DialogContent></Dialog>
    <ConfirmDelete label={deleting ? `application from ${deleting.full_name}` : null} busy={busy} onCancel={() => setDeleting(null)} onConfirm={() => void remove()} />
  </>;
}
