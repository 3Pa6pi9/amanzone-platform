"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addInventory(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const price = Number(formData.get('price'));
  const description = formData.get('description') as string;
  let imageUrl = '[Image]';

  const file = formData.get('imageFile') as File;
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    imageUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
  }

  await prisma.product.create({
    data: { name, category, price, description, imageUrl, inStock: true }
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProduct(productId: string) {
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateSettings(formData: FormData) {
  const storeName = formData.get('storeName') as string;
  const slogan = formData.get('slogan') as string;
  const masterPasscode = formData.get('masterPasscode') as string;
  let logoUrl = formData.get('existingLogoUrl') as string; 

  const file = formData.get('logoFile') as File;
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    logoUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
  }

  await prisma.settings.upsert({
    where: { id: 'default' },
    update: { storeName, slogan, logoUrl, masterPasscode },
    create: { id: 'default', storeName, slogan, logoUrl, masterPasscode }
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function approveOrder(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'FUNDS_APPROVED' }
  });
  revalidatePath('/admin/orders');
}