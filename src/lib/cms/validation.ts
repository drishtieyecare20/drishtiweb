import { z } from 'zod';

export const kinds = ['slideshow', 'services', 'doctors', 'gallery', 'youtube', 'testimonials', 'facilities', 'jobs', 'team'] as const;
export type ContentKind = typeof kinds[number];
export const appointmentStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'] as const;
export function youtubeId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase();
    let id: string | null = null;
    if (host === 'youtu.be') id = url.pathname.split('/')[1] ?? null;
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v');
      else if (/^\/(shorts|embed)\//.test(url.pathname)) id = url.pathname.split('/')[2] ?? null;
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
export function validateUpload(file: Pick<File, 'type' | 'size'>, limit = 5): string | null {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Choose a JPEG, PNG, or WebP image.';
  if (file.size <= 0 || file.size > limit * 1024 * 1024) return `Choose an image smaller than ${limit} MB.`;
  return null;
}
export const appointmentSchema = z.object({
  patient_name: z.string().trim().min(2).max(80),
  phone: z.string().transform(v => v.replace(/\D/g, '')).pipe(z.string().regex(/^\d{10,15}$/)),
  email: z.union([z.literal(''), z.string().email().max(120)]).default(''),
  preferred_date: z.string().refine(v => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Choose a valid date.').default(''),
  preferred_time: z.string().max(80).default(''), reason: z.string().trim().max(500).default(''),
});
export const intervalSchema = z.number().int().min(15).max(30);
export const statusSchema = z.enum(appointmentStatuses);
export const ctaPaths = ['/', '/about', '/eye-care', '/doctors', '/facilities', '/gallery', '/testimonials', '/contact', '/contact#appointment'] as const;
export function safeLink(value: string, protocols = ['https:', 'tel:']): boolean {
  try { const u = new URL(value); return protocols.includes(u.protocol) && !u.username && !u.password; } catch { return false; }
}
export const applicationStatuses = ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'] as const;
export const jobApplicationSchema = z.object({
  job_id: z.string().uuid().nullable().default(null),
  position: z.string().trim().min(2).max(180),
  full_name: z.string().trim().min(2).max(80),
  phone: z.string().transform(v => v.replace(/\D/g, '')).pipe(z.string().regex(/^\d{10,15}$/)),
  email: z.union([z.literal(''), z.string().trim().email().max(120)]).default(''),
  qualification: z.string().trim().max(200).default(''),
  experience: z.string().trim().max(200).default(''),
  resume_link: z.union([z.literal(''), z.string().trim().url().max(500).refine(v => v.startsWith('https://'), 'Use a secure https link.')]).default(''),
  message: z.string().trim().max(1500).default(''),
});
