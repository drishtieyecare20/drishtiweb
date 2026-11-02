import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/slideshow')({ head: () => ({ meta: [...seo('Slideshow | Drishti Eye Care Admin', 'Securely manage slideshow for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="slideshow" /> });
