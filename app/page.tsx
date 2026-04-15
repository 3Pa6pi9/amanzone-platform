import { prisma } from '@/lib/prisma';
import StorefrontClient from './StorefrontClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const inventory = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });

  return <StorefrontClient initialInventory={inventory} settings={settings} />;
}