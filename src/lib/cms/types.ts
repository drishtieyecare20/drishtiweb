import type { Tables } from '@/integrations/supabase/types';
export type ContentRow = Tables<'content'> & { image_url?: string | null };
export type SettingsRow = Tables<'website_settings'> & { logo_url?: string | null };
export type MediaRow = Tables<'media'> & { url?: string | null };
export type AppointmentRow = Tables<'appointments'>;
export function objectData(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
export function textData(value: unknown, key: string, fallback = ''): string {
  const v = objectData(value)[key]; return typeof v === 'string' ? v : fallback;
}