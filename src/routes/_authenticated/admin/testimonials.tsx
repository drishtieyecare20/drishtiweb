import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/testimonials')({ head: () => ({ meta: [...seo('Testimonials | Drishti Eye Care Admin', 'Securely manage testimonials for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="testimonials" /> });
