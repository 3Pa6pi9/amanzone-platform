"use server";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function authenticateAdmin(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  
  // Grabs the dynamic password from your Supabase cloud
  const settings = await prisma.settings.findUnique({ where: { id: 'default' } });
  const MASTER_KEY = settings?.masterPasscode || "AmanZone2026"; 

  if (passcode === MASTER_KEY) {
    (await cookies()).set('admin_session', 'authenticated_true_az_hash', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, 
      path: '/',
    });
    redirect('/admin');
  } else {
    return { error: "ACCESS DENIED: Invalid Credentials" };
  }
}