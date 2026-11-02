import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/youtube')({ head: () => ({ meta: [...seo('YouTube Videos | Drishti Eye Care Admin', 'Securely manage youtube videos for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="youtube" /> });
