import { useState } from 'react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LayoutDashboard, Images, Stethoscope, Users, Image, Youtube, MessageSquare, CalendarCheck, Settings, Building2, Briefcase, FileUser, FileText, LogOut, Menu, ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { logoUrl } from '@/data/site';

export const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }, { to: '/admin/slideshow', label: 'Slideshow', icon: Images },
  { to: '/admin/services', label: 'Eye Care Services', icon: Stethoscope }, { to: '/admin/doctors', label: 'Doctors', icon: Users }, { to: '/admin/team', label: 'Our Team', icon: Users },
  { to: '/admin/gallery', label: 'Gallery', icon: Image }, { to: '/admin/facilities', label: 'Facilities', icon: Building2 }, { to: '/admin/youtube', label: 'YouTube Videos', icon: Youtube },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare }, { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/careers', label: 'Job Openings', icon: Briefcase }, { to: '/admin/applications', label: 'Job Applications', icon: FileUser },
  { to: '/admin/pages', label: 'Page Content & Menu', icon: FileText },
  { to: '/admin/settings', label: 'Website Settings', icon: Settings },
] as const;
export function AdminShell() {
  const [open, setOpen] = useState(false); const [busy, setBusy] = useState(false); const navigate = useNavigate(); const query = useQueryClient();
  async function logout() { setBusy(true); await query.cancelQueries(); query.clear(); await supabase.auth.signOut(); await navigate({ to: '/admin/login', replace: true }); setBusy(false); }
  return <div className="min-h-screen bg-tint">
    {open && <div className="fixed inset-0 z-30 bg-primary-deep/40 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-24 items-center justify-between border-b px-6"><img src={logoUrl} alt="Drishti Eye Care" className="h-14 max-w-full object-contain" /><Button aria-label="Close navigation" size="icon" variant="ghost" className="lg:hidden" onClick={() => setOpen(false)}><X /></Button></div>
      <p className="px-6 pb-3 pt-6 text-xs font-bold uppercase text-muted-foreground">Clinic workspace</p>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">{adminNav.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeProps={{ className: 'bg-secondary text-primary font-bold' }} inactiveProps={{ className: 'text-muted-foreground hover:bg-muted' }} className="flex items-center gap-3 rounded-md px-4 py-3 text-sm"><item.icon className="h-4 w-4 shrink-0" />{item.label}</Link>)}</nav>
      <div className="border-t p-4"><Button variant="ghost" className="w-full justify-start" onClick={logout} disabled={busy}><LogOut />{busy ? 'Signing out…' : 'Sign Out'}</Button></div>
    </aside>
    <div className="lg:pl-64"><header className="flex h-20 items-center justify-between border-b bg-background px-5 sm:px-8"><div className="flex items-center gap-3"><Button size="icon" variant="ghost" className="lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu /></Button><span className="text-sm font-semibold text-primary-deep">Drishti Eye Care <span className="hidden font-normal text-muted-foreground sm:inline">/ Administration</span></span></div><Button asChild variant="outline"><a href="/" target="_blank" rel="noopener noreferrer">View Website<ArrowUpRight /></a></Button></header><div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10"><Outlet /></div></div>
  </div>;
}