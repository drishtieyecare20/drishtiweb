import { createFileRoute, redirect } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/auth')({ head: () => seo('Admin Access | Drishti Eye Care', 'Administrator access for Drishti Eye Care.'), beforeLoad: () => { throw redirect({ to: '/admin/login' }); } });