import { useEffect, useRef, useState } from 'react';
import { Upload, X, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { uploadPhoto } from '@/lib/cms/admin-client';
import { validateUpload } from '@/lib/cms/validation';

export function PhotoUpload({ value, onChange, limit = 5 }: { value: { id: string; url?: string | null } | null; onChange: (v: { id: string; url?: string | null } | null) => void; limit?: number }) {
  const input = useRef<HTMLInputElement>(null); const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(''); const [busy, setBusy] = useState(false); const [progress, setProgress] = useState(0); const [error, setError] = useState('');
  useEffect(() => { if (!file) { setPreview(''); return; } const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  function choose(f?: File) { if (!f) return; const issue = validateUpload(f, limit); setError(issue ?? ''); if (!issue) setFile(f); }
  async function upload() { if (!file) return; setBusy(true); setError(''); try { const row = await uploadPhoto(file, limit, setProgress); onChange({ id: row.id, url: row.url ?? null }); setFile(null); } catch (e) { setError(e instanceof Error ? e.message : 'Upload failed.'); } finally { setBusy(false); } }
  return <div className="grid gap-3">
    <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (!busy) choose(e.dataTransfer.files[0]); }} className="grid min-h-40 place-items-center overflow-hidden rounded-lg border border-dashed bg-muted p-4">
      {preview || value?.url ? <img src={preview || value?.url || ''} alt="Selected photo preview" className="max-h-52 max-w-full rounded-md object-contain" /> : <ImagePlus className="h-9 w-9 text-muted-foreground" />}
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => choose(e.target.files?.[0])} />
      <Button type="button" variant="outline" className="mt-3" disabled={busy} onClick={() => input.current?.click()}><Upload />{value ? 'Replace Photo' : 'Upload Photo'}</Button>
      <span className="mt-2 text-xs text-muted-foreground">JPEG, PNG, WebP · up to {limit} MB</span>
    </div>
    {file && <Button type="button" onClick={upload} disabled={busy}><Upload />{busy ? 'Uploading…' : 'Upload Selected Photo'}</Button>}
    {busy && <Progress value={progress} aria-label={`Upload progress ${progress}%`} />}
    {(file || value) && <Button variant="ghost" type="button" disabled={busy} onClick={() => { setFile(null); onChange(null); }}><X />Remove Photo</Button>}
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
  </div>;
}