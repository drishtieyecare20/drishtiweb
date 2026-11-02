import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/admin/Dashboard';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/dashboard')({ head: () => ({ meta: [...seo('Dashboard | Drishti Eye Care Admin', 'Secure clinic administration: dashboard.').meta, { name: 'robots', content: 'noindex' }] }), component: Dashboard });
