import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { appointmentSchema, jobApplicationSchema } from './validation';
import { getRequest } from '@tanstack/react-start/server';

export const readPublicContent = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) return null;
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => { const h = new Headers(init?.headers); if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization'); h.set('apikey', key); return fetch(input, { ...init, headers: h }); } },
  });
  try {
    const [content, settings, media] = await Promise.all([
      client.from('content').select('*').eq('published', true).order('display_order').order('created_at').limit(1000),
      client.from('website_settings').select('*').eq('id', 1).maybeSingle(),
      client.from('media').select('id,path').eq('approved', true).limit(1000),
    ]);
    if (content.error || settings.error || media.error) return null;
    const publishedImageIds = new Set((content.data ?? []).flatMap(row => row.image_id ? [row.image_id] : []));
    if (settings.data?.logo_id) publishedImageIds.add(settings.data.logo_id);
    const imageMap = new Map<string, string>();
    await Promise.all((media.data ?? []).filter(m => publishedImageIds.has(m.id)).map(async m => {
      const signed = await client.storage.from('clinic-images').createSignedUrl(m.path, 3600);
      if (signed.data?.signedUrl) {
        // Keep generated storage links reachable from the browser, including backend drafts.
        const browserUrl = process.env['VITE_SUPABASE_URL'] ?? url;
        imageMap.set(m.id, signed.data.signedUrl.replace(url, browserUrl));
      }
    }));
    return { content: (content.data ?? []).map(r => ({ ...r, image_url: r.image_id ? imageMap.get(r.image_id) ?? null : null })), settings: settings.data ? { ...settings.data, logo_url: settings.data.logo_id ? imageMap.get(settings.data.logo_id) ?? null : null } : null };
  } catch { return null; }
});

export const submitAppointment = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => appointmentSchema.parse(input))
  .handler(async ({ data }) => {
    // Send email notification via Web3Forms
    const web3formsKey = process.env['WEB3FORMS_ACCESS_KEY'];
    if (!web3formsKey) return { success: false, error: 'Email notification service is not configured. Please call the clinic.' };

    const emailRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `🏥 New Appointment Request from ${data.patient_name}`,
        from_name: 'Drishti Eye Care Website',
        'Patient Name': data.patient_name,
        'Phone': data.phone,
        'Email': data.email || 'Not provided',
        'Preferred Date': data.preferred_date || 'Not specified',
        'Preferred Time': data.preferred_time || 'Not specified',
        'Reason for Visit': data.reason || 'Not provided',
      }),
    });

    if (!emailRes.ok) return { success: false, error: 'Your request could not be sent. Please try again or call the clinic.' };
    const emailResult = await emailRes.json();
    if (!emailResult.success) return { success: false, error: 'Your request could not be sent. Please try again or call the clinic.' };

    // Also save to Supabase if the service role key is available (for admin panel)
    try {
      const serviceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];
      if (serviceKey) {
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const request = getRequest();
        const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
        const key = Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
        await supabaseAdmin.rpc('check_booking_limit', { _key: key });
        await supabaseAdmin.rpc('submit_appointment_request', { _name: data.patient_name, _phone: data.phone, _email: data.email, _date: data.preferred_date, _time: data.preferred_time, _reason: data.reason });
      }
    } catch { /* Supabase save is optional — email was already sent */ }

    return { success: true };
  });

async function allowRequest(scope: string) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const request = getRequest();
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${scope}:${ip}`));
  const key = Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
  const limit = await supabaseAdmin.rpc('check_booking_limit', { _key: key });
  return { supabaseAdmin, ok: !limit.error && !!limit.data };
}

export const submitJobApplication = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => jobApplicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin, ok } = await allowRequest('careers');
    if (!ok) return { success: false, error: 'Too many applications. Please try again later or call the clinic.' };
    const result = await supabaseAdmin.rpc('submit_job_application', { _job_id: data.job_id as string, _position: data.position, _name: data.full_name, _phone: data.phone, _email: data.email, _qualification: data.qualification, _experience: data.experience, _resume: data.resume_link, _message: data.message });
    if (result.error) return { success: false, error: 'Your application could not be saved. Please try again or call the clinic.' };
    return { success: true };
  });
