import { createFileRoute } from '@tanstack/react-router';
import { PageContent } from '@/components/admin/PageContent';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/pages')({ head: () => ({ meta: [...seo('Page Content & Menu | Drishti Eye Care Admin', 'Secure clinic administration: page wording and menu.').meta, { name: 'robots', content: 'noindex' }] }), component: PageContent });
