import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/services')({ head: () => ({ meta: [...seo('Eye Care Services | Drishti Eye Care Admin', 'Securely manage eye care services for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="services" /> });
