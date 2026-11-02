import { useEffect, useState, type FormEvent } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowUp, ArrowDown, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { allNav, arrangeNav, pageDefaults, pageFields } from '@/data/pages';
import { objectData } from '@/lib/cms/types';
import type { Json } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const locked = new Set(['/', '/contact']);

export function PageContent() {
  const query = useQueryClient();
  const settings = useQuery({ queryKey: ['admin-pages'], queryFn: async () => { const r = await supabase.from('website_settings').select('pages').eq('id', 1).single(); if (r.error) throw new Error(r.error.message); return objectData(r.data.pages); } });
  const [order, setOrder] = useState<string[]>(allNav.map(n => n.to)); const [hidden, setHidden] = useState<string[]>([]); const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!settings.data) return;
    const h = settings.data['nav.hidden']; const hid = Array.isArray(h) ? h.filter((v): v is string => typeof v === 'string') : [];
    setHidden(hid);
    // arrangeNav drops hidden items, so rebuild the full ordered list including hidden ones.
    const visible = arrangeNav(settings.data['nav.order'], []).map(n => n.to); setOrder(visible);
  }, [settings.data]);
  function move(i: number, d: number) { const next = [...order]; const [x] = next.splice(i, 1); if (x) next.splice(i + d, 0, x); setOrder(next); }
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget); setBusy(true);
    try {
      const pages: Record<string, Json> = { 'nav.order': order, 'nav.hidden': hidden.filter(h => !locked.has(h)) };
      for (const field of pageFields) pages[field.key] = String(f.get(field.key) ?? '').slice(0, 5000);
      const r = await supabase.from('website_settings').update({ pages }).eq('id', 1);
      if (r.error) throw new Error(r.error.message);
      await Promise.all([query.invalidateQueries({ queryKey: ['admin-pages'] }), query.invalidateQueries({ queryKey: ['site-content'] })]);
      toast.success('Page content saved. The website is updated.');
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Could not save.'); } finally { setBusy(false); }
  }
  const groups = [...new Set(pageFields.map(f => f.group))];
  const label = (to: string) => allNav.find(n => n.to === to)?.label ?? to;
  return <>
    <p className="eyebrow">Website wording</p><h1 className="mt-2 text-3xl text-primary-deep">Page Content & Menu</h1>
    <p className="mt-2 text-sm text-muted-foreground">Change headings and text on the website, and choose the order and visibility of menu pages.</p>
    {settings.isPending ? <p className="py-12">Loading…</p> : settings.error ? <p role="alert" className="py-12">Unable to load page content.</p> :
    <form key={JSON.stringify(settings.data).length} onSubmit={save} className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="grid content-start gap-10">
        {groups.map(g => <section key={g} className="rounded-lg border bg-background p-6"><h2 className="border-b pb-3 text-xl">{g}</h2><div className="mt-5 grid gap-5">
          {pageFields.filter(f => f.group === g).map(f => { const v = settings.data?.[f.key]; const value = typeof v === 'string' ? v : pageDefaults[f.key] ?? '';
            return <label key={f.key} className="grid gap-2 text-sm font-medium">{f.label}{f.long ? <Textarea name={f.key} rows={4} defaultValue={value} maxLength={5000} /> : <Input name={f.key} defaultValue={value} maxLength={300} />}{f.hint && <span className="text-xs font-normal text-muted-foreground">{f.hint}</span>}</label>; })}
        </div></section>)}
      </div>
      <aside className="h-fit rounded-lg border bg-background p-6 lg:sticky lg:top-6">
        <h2 className="text-xl">Menu pages</h2><p className="mt-1 text-xs text-muted-foreground">Home and Contact always stay visible.</p>
        <ul className="mt-4 grid gap-2">{order.map((to, i) => <li key={to} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <input type="checkbox" aria-label={`Show ${label(to)}`} disabled={locked.has(to)} checked={!hidden.includes(to)} onChange={e => setHidden(e.target.checked ? hidden.filter(h => h !== to) : [...hidden, to])} />
          <span className="flex-1">{label(to)}</span>
          <Button type="button" variant="ghost" size="icon" aria-label={`Move ${label(to)} up`} disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp /></Button>
          <Button type="button" variant="ghost" size="icon" aria-label={`Move ${label(to)} down`} disabled={i === order.length - 1} onClick={() => move(i, 1)}><ArrowDown /></Button>
        </li>)}</ul>
        <Button type="submit" className="mt-6 w-full" disabled={busy}><Save />{busy ? 'Saving…' : 'Save Changes'}</Button>
      </aside>
    </form>}
  </>;
}
