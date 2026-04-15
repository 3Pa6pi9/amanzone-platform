import { prisma } from '@/lib/prisma';
import AdminClient from './AdminClient';
export const dynamic = 'force-dynamic';
export default async function AdminPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
  return <AdminClient products={products} settings={settings} />;
}