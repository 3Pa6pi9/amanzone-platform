// VERCEL PRODUCTION BYPASS - SINGLE DYNAMIC EXPORT
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items, transactionId } = body;

    const order = await prisma.order.create({
      data: {
        totalAmount: amount,
        items: JSON.stringify(items),
        transactionId: transactionId,
        status: 'PENDING_VERIFICATION'
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}