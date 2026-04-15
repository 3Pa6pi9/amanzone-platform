import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// CRITICAL: This forces Next.js to fetch fresh data every single second, killing the cache bug!
export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(products, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load database" }, { status: 500 });
  }
}