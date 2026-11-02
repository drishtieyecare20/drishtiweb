import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/facilities')({ head: () => ({ meta: [...seo('Facilities | Drishti Eye Care Admin', 'Securely manage facilities for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="facilities" /> });
