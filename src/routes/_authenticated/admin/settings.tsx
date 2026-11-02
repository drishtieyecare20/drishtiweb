import { createFileRoute } from '@tanstack/react-router';
import { WebsiteSettings } from '@/components/admin/WebsiteSettings';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/settings')({ head: () => ({ meta: [...seo('Website Settings | Drishti Eye Care Admin', 'Secure clinic administration: website settings.').meta, { name: 'robots', content: 'noindex' }] }), component: WebsiteSettings });
