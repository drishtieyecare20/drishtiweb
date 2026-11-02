import { supabase } from '@/integrations/supabase/client';
import type { ContentRow, MediaRow } from './types';
import type { ContentKind } from './validation';
import { validateUpload } from './validation';

export async function listContent(kind?: ContentKind): Promise<ContentRow[]> {
  let q = supabase.from('content').select('*').order('display_order').order('created_at');
  if (kind) q = q.eq('kind', kind);
  const { data, error } = await q.limit(1000); if (error) throw new Error(error.message);
  const { data: media, error: me } = await supabase.from('media').select('*').limit(1000); if (me) throw new Error(me.message);
  const images = new Map<string, string>();
  await Promise.all((media ?? []).map(async m => { const signed = await supabase.storage.from('clinic-images').createSignedUrl(m.path, 3600); if (signed.data) images.set(m.id, signed.data.signedUrl); }));
  return (data ?? []).map(row => ({ ...row, image_url: row.image_id ? images.get(row.image_id) ?? null : null }));
}
export async function uploadPhoto(file: File, limit: number, onProgress: (value: number) => void): Promise<MediaRow> {
  const issue = validateUpload(file, limit); if (issue) throw new Error(issue);
  onProgress(5);
  const bitmap = await createImageBitmap(file);
  let blob: Blob = file;
  if (Math.max(bitmap.width, bitmap.height) > 2400) {
    const scale = 2400 / Math.max(bitmap.width, bitmap.height); const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('Unable to prepare photo.')), 'image/webp', 0.9));
  }
  bitmap.close(); onProgress(20);
  const ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) throw new Error('Please sign in again.');
  const storageUrl = `${import.meta.env['VITE_SUPABASE_URL']}/storage/v1/object/clinic-images/${path}`;
  await new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest(); request.open('POST', storageUrl);
    request.setRequestHeader('Authorization', `Bearer ${session.session?.access_token ?? ''}`);
    request.setRequestHeader('apikey', import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ?? '');
    request.setRequestHeader('Content-Type', blob.type);
    request.upload.onprogress = event => { if (event.lengthComputable) onProgress(20 + Math.round(event.loaded / event.total * 70)); };
    request.onerror = () => reject(new Error('Upload failed. Check your connection.'));
    request.onload = () => request.status >= 200 && request.status < 300 ? resolve() : reject(new Error('Photo upload was rejected. Please try again.'));
    request.send(blob);
  });
  const result = await supabase.from('media').insert({ path, filename: file.name, mime_type: blob.type, size_bytes: blob.size }).select().single();
  if (result.error) { await supabase.storage.from('clinic-images').remove([path]); throw new Error(result.error.message); }
  onProgress(100);
  const signed = await supabase.storage.from('clinic-images').createSignedUrl(path, 3600);
  return { ...result.data, url: signed.data?.signedUrl ?? null };
}
export async function deletePhoto(id: string) {
  const references = await supabase.from('content').select('id', { count: 'exact', head: true }).eq('image_id', id);
  const logo = await supabase.from('website_settings').select('id', { count: 'exact', head: true }).eq('logo_id', id);
  if (references.error || logo.error) throw new Error('Unable to check photo references.');
  if ((references.count ?? 0) + (logo.count ?? 0) > 0) throw new Error('This photo is still used on the website. Replace or remove it from those items first.');
  const row = await supabase.from('media').select('path').eq('id', id).single(); if (row.error) throw new Error(row.error.message);
  const deletion = await supabase.from('media').delete().eq('id', id); if (deletion.error) throw new Error(deletion.error.message);
  const file = await supabase.storage.from('clinic-images').remove([row.data.path]); if (file.error) throw new Error(file.error.message);
}