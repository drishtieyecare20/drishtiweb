import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import { intervalSchema, safeLink } from './validation';
import { objectData } from './types';

export const saveSettings = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((value: unknown) => z.object({ data: z.record(z.unknown()), slideshow_interval: intervalSchema, upload_limit_mb: z.number().int().min(1).max(10), logo_id: z.string().uuid().nullable() }).parse(value))
  .handler(async ({ data, context }) => {
    const role = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (!role.data) throw new Error('Administrator access required.');
    const d = data.data;
    if (typeof d['name'] !== 'string' || !d['name'].trim() || typeof d['tagline'] !== 'string') throw new Error('Clinic name and tagline are required.');
    if (!Array.isArray(d['phones']) || !d['phones'].length || !d['phones'].every(p => typeof p === 'string' && /^\d{10,15}$/.test(p.replace(/\D/g, '')))) throw new Error('Enter valid phone numbers.');
    if (!Array.isArray(d['addressLines']) || !d['addressLines'].some(v => typeof v === 'string' && v.trim())) throw new Error('Address is required.');
    for (const key of ['whatsappHref', 'directionsHref', 'mapEmbed', 'facebook', 'instagram', 'youtube']) {
      const value = d[key]; if (value && (typeof value !== 'string' || !safeLink(value, ['https:']))) throw new Error(`Enter a valid secure link for ${key}.`);
    }
    const map = d['mapEmbed'];
    if (typeof map === 'string' && map && !['www.google.com', 'maps.google.com'].includes(new URL(map).hostname)) throw new Error('Use a Google Maps link for the map.');
    if (data.logo_id) {
      const media = await context.supabase.from('media').update({ approved: true }).eq('id', data.logo_id);
      if (media.error) throw new Error(media.error.message);
    }
    const result = await context.supabase.from('website_settings').upsert({ id: 1, ...data, data: objectData(data.data) as import('@/integrations/supabase/types').Json });
    if (result.error) throw new Error(result.error.message);
    return { success: true };
  });