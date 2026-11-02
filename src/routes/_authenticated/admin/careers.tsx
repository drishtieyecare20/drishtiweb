import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/ContentManager';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/careers')({ head: () => ({ meta: [...seo('Job Openings | Drishti Eye Care Admin', 'Securely manage job openings for Drishti Eye Care.').meta, { name: 'robots', content: 'noindex' }] }), component: () => <ContentManager kind="jobs" /> });
