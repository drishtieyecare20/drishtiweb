import { createFileRoute } from '@tanstack/react-router';
import { JobApplications } from '@/components/admin/JobApplications';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/applications')({ head: () => ({ meta: [...seo('Job Applications | Drishti Eye Care Admin', 'Secure clinic administration: job applications.').meta, { name: 'robots', content: 'noindex' }] }), component: JobApplications });
