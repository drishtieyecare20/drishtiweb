import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/gallery')({ head: () => ({ meta: [...seo('Gallery | Drishti Eye Care Admin', 'Securely manage gallery for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="gallery" /> });
