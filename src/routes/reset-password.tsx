import { useEffect, useState, type FormEvent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { seo } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export const Route = createFileRoute('/reset-password')({ head: () => seo('Reset Password | Drishti Eye Care', 'Securely reset your Drishti Eye Care administrator password.'), component: ResetPassword });
function ResetPassword() {
  const [valid, setValid] = useState(false); const [checking, setChecking] = useState(true); const [linkError, setLinkError] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [sent, setSent] = useState(false); const navigate = useNavigate();
  useEffect(() => {
    // The auth client consumes and clears the URL hash on load, so also accept the
    // ?type= marker set in our redirect link and the PASSWORD_RECOVERY event.
    const hash = new URLSearchParams(window.location.hash.slice(1)); const query = new URLSearchParams(window.location.search);
    const code = hash.get('error_code') ?? query.get('error_code');
    if (code) setLinkError(code === 'otp_expired' ? 'This link has already been used or has expired. Each link works only once.' : (hash.get('error_description') ?? query.get('error_description') ?? 'This link could not be used.').replace(/\+/g, ' '));
    const marked = ['recovery', 'invite'].includes(hash.get('type') ?? query.get('type') ?? '');
    let active = true;
    const check = (recovery: boolean) => supabase.auth.getUser().then(({ data }) => { if (active && recovery && data.user) setValid(true); });
    const { data: sub } = supabase.auth.onAuthStateChange(event => { if (event === 'PASSWORD_RECOVERY') void check(true); else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') void check(marked); });
    void check(marked).finally(() => setTimeout(() => active && setChecking(false), 800));
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);
  async function save(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const password = String(f.get('password')); if (password !== f.get('confirm')) return setError('Passwords do not match.'); setBusy(true); const { error: err } = await supabase.auth.updateUser({ password }); setBusy(false); if (err) return setError(err.message); await supabase.auth.signOut(); await navigate({ to: '/admin/login', replace: true }); }
  async function resend(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const email = String(new FormData(e.currentTarget).get('email')).trim(); setBusy(true); setError(''); const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password?type=recovery` }); setBusy(false); if (err) return setError(err.message); setSent(true); }
  const expired = <div className="grid gap-5"><p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{linkError || 'No valid reset link was found. Request a new one below.'}</p>{sent ? <p className="rounded-md bg-tint p-4 text-sm">A new link has been sent. Open the <strong>newest</strong> email and click its button <strong>only once</strong>. Delete older reset emails so they aren't clicked by mistake.</p> : <form className="grid gap-4" onSubmit={resend}><label className="grid gap-2">Admin email<Input required name="email" type="email" autoComplete="email" /></label>{error && <p role="alert" className="text-destructive">{error}</p>}<Button disabled={busy}>{busy ? 'Sending…' : 'Email me a new link'}</Button></form>}<Button asChild variant="outline"><a href="/admin/login">Back to Sign In</a></Button></div>;
  return <div className="grid min-h-screen place-items-center bg-tint px-6"><div className="w-full max-w-md"><h1 className="mb-8 text-3xl text-primary-deep">Set a new password</h1>{valid ? <form className="grid gap-5" onSubmit={save}><label className="grid gap-2">New Password<Input required name="password" type="password" minLength={8} autoComplete="new-password" /></label><label className="grid gap-2">Confirm Password<Input required name="confirm" type="password" minLength={8} autoComplete="new-password" /></label>{error && <p role="alert" className="text-destructive">{error}</p>}<Button disabled={busy}>{busy ? 'Saving…' : 'Save Password'}</Button></form> : checking ? <p className="text-muted-foreground">Checking your link…</p> : expired}</div></div>;
}