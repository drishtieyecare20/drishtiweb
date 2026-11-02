import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/doctors')({ head: () => ({ meta: [...seo('Doctors | Drishti Eye Care Admin', 'Securely manage doctors for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="doctors" /> });
