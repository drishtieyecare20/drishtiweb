import { describe, expect, it } from 'vitest';
import { arrangeNav, parseStats } from '@/data/pages';
import { jobApplicationSchema } from '@/lib/cms/validation';

describe('menu order and visibility', () => {
  it('follows saved order', () => {
    expect(arrangeNav(['/contact', '/careers'], []).slice(0, 2).map(n => n.to)).toEqual(['/contact', '/careers']);
  });
  it('hides chosen pages but never Home or Contact', () => {
    const to = arrangeNav([], ['/gallery', '/', '/contact']).map(n => n.to);
    expect(to).not.toContain('/gallery');
    expect(to).toContain('/');
    expect(to).toContain('/contact');
  });
});

describe('numbers band', () => {
  it('reads "value | label" lines', () => {
    expect(parseStats('10+ | Years\nbad line')).toEqual([{ value: '10+', label: 'Years' }]);
  });
});

describe('job application', () => {
  const base = { position: 'Optometrist', full_name: 'Asha Rao', phone: '99931 75735' };
  it('accepts a valid application and keeps digits only', () => {
    expect(jobApplicationSchema.parse(base).phone).toBe('9993175735');
  });
  it('rejects a short phone number', () => {
    expect(jobApplicationSchema.safeParse({ ...base, phone: '12345' }).success).toBe(false);
  });
  it('rejects a non-https CV link', () => {
    expect(jobApplicationSchema.safeParse({ ...base, resume_link: 'http://x.com/cv' }).success).toBe(false);
  });
});
