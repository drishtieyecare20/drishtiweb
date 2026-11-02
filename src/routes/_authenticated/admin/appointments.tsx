import { createFileRoute } from '@tanstack/react-router';
import { Appointments } from '@/components/admin/Appointments';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/_authenticated/admin/appointments')({ head: () => ({ meta: [...seo('Appointments | Drishti Eye Care Admin', 'Secure clinic administration: appointments.').meta, { name: 'robots', content: 'noindex' }] }), component: Appointments });
