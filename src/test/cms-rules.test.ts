import { describe, expect, it } from 'vitest';
import { appointmentSchema, appointmentStatuses, intervalSchema, validateUpload, youtubeId } from '@/lib/cms/validation';
describe('Clinic administration rules', () => {
  it('permits the required 15–30 second slideshow range and 20 second default', () => {
    expect(intervalSchema.parse(20)).toBe(20); expect(intervalSchema.parse(15)).toBe(15); expect(intervalSchema.parse(30)).toBe(30);
    expect(intervalSchema.safeParse(14).success).toBe(false); expect(intervalSchema.safeParse(31).success).toBe(false);
  });
  it('allows exactly the five appointment statuses', () => { expect(appointmentStatuses).toEqual(['New','Contacted','Confirmed','Completed','Cancelled']); });
  it('accepts optional appointment fields and validates patient inputs', () => {
    expect(appointmentSchema.parse({ patient_name: 'Test Patient', phone: '99931 75735' }).phone).toBe('9993175735');
    expect(appointmentSchema.safeParse({ patient_name: 'A', phone: '123' }).success).toBe(false);
    expect(appointmentSchema.safeParse({ patient_name: 'Test Patient', phone: '9993175735', email: 'wrong' }).success).toBe(false);
  });
  it('supports regular, shortened, and Shorts YouTube links', () => {
    for (const url of ['https://www.youtube.com/watch?v=jNQXAC9IVRw','https://youtu.be/jNQXAC9IVRw','https://www.youtube.com/shorts/jNQXAC9IVRw']) expect(youtubeId(url)).toBe('jNQXAC9IVRw');
  });
  it('rejects non-YouTube domains and unsafe or invalid video links', () => {
    for (const url of ['https://youtube.com.evil.com/watch?v=jNQXAC9IVRw','javascript:alert(1)','https://evil.com/?v=jNQXAC9IVRw','https://youtube.com/watch?v=short','https://youtube.com@evil.com/watch?v=jNQXAC9IVRw']) expect(youtubeId(url)).toBeNull();
  });
  it('allows only JPEG PNG and WebP photo files', () => {
    for (const type of ['image/jpeg','image/png','image/webp']) expect(validateUpload({ type, size: 1000 })).toBeNull();
    for (const type of ['image/svg+xml','text/html','application/pdf']) expect(validateUpload({ type, size: 1000 })).not.toBeNull();
  });
  it('enforces configured photo size and rejects empty files', () => {
    expect(validateUpload({ type: 'image/jpeg', size: 5*1024*1024 }, 5)).toBeNull();
    expect(validateUpload({ type: 'image/jpeg', size: 5*1024*1024+1 }, 5)).not.toBeNull();
    expect(validateUpload({ type: 'image/jpeg', size: 0 }, 5)).not.toBeNull();
  });
});