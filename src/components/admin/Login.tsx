import { useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { logoUrl } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminLogin() {
  const navigate = useNavigate(); const [forgot, setForgot] = useState(false); const [show, setShow] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [sent, setSent] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = new FormData(e.currentTarget); const email = String(form.get('email') ?? '').trim(); setBusy(true); setError('');
    try {
      if (forgot) { const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password?type=recovery` }); if (err) throw err; setSent(true); }
      else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password: String(form.get('password') ?? '') }); if (err) throw err;
        const { data } = await supabase.auth.getUser(); if (!data.user) throw new Error('Please sign in again.');
        const role = await supabase.rpc('has_role', { _user_id: data.user.id, _role: 'admin' });
        if (!role.data) { await supabase.auth.signOut(); throw new Error('This account does not have administrator access.'); }
        await navigate({ to: '/admin/dashboard', replace: true });
      }
    } catch (err) { setError(err instanceof Error ? err.message : 'Sign-in failed. Please try again.'); } finally { setBusy(false); }
  }
  return <div className="flex min-h-screen flex-col bg-tint"><div className="mx-auto flex w-full max-w-7xl items-center justify-between border-b px-6 py-5"><a href="/"><img src={logoUrl} alt="Drishti Eye Care" className="h-14 w-auto" /></a><Button asChild variant="ghost"><a href="/"><ArrowLeft />Website</a></Button></div><div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
    <div className="mb-8"><ShieldCheck className="mb-4 h-9 w-9 text-brand-red" /><p className="eyebrow">Drishti administration</p><h1 className="mt-3 text-4xl text-primary-deep">{forgot ? 'Reset your password' : 'Welcome back'}</h1></div>
    {sent ? <div role="status" className="rounded-lg border bg-background p-6"><h2 className="text-xl">Check your email</h2><p className="mt-3 text-sm text-muted-foreground">If an account exists for this address, a password reset link is on its way.</p><Button className="mt-5" onClick={() => { setSent(false); setForgot(false); }}>Back to sign in</Button></div> : <form onSubmit={submit} className="grid gap-5">
      <label className="grid gap-2 text-sm font-semibold">Email<Input name="email" type="email" autoComplete="email" required className="h-12 bg-background" placeholder="Your email address" /></label>
      {!forgot && <label className="grid gap-2 text-sm font-semibold">Password<div className="relative"><Input name="password" type={show ? 'text' : 'password'} required autoComplete="current-password" className="h-12 bg-background pr-12" /><Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1.5" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</Button></div></label>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button disabled={busy} type="submit" className="h-12 bg-brand-red text-brand-red-foreground hover:bg-brand-red/90">{busy ? 'Please wait…' : forgot ? 'Send Reset Link' : 'Sign In'}</Button>
      <Button type="button" variant="link" onClick={() => { setForgot(!forgot); setError(''); }}>{forgot ? 'Back to sign in' : 'Forgot password?'}</Button>
    </form>}
    <p className="mt-8 text-center text-xs text-muted-foreground">Authorized clinic administrators only</p>
  </div></div>;
}