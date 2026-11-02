import { createFileRoute } from '@tanstack/react-router';
import { AdminLogin } from '@/components/admin/Login';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/admin/login')({ head: () => ({ ...seo('Administrator Sign In | Drishti Eye Care', 'Secure sign-in for authorized Drishti Eye Care administrators.'), meta: [...seo('Administrator Sign In | Drishti Eye Care', 'Secure sign-in for authorized Drishti Eye Care administrators.').meta, { name: 'robots', content: 'noindex' }] }), component: AdminLogin });