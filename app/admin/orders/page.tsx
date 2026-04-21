// VERCEL PRODUCTION BYPASS - SINGLE DYNAMIC EXPORT
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. The POST function (Creates orders from the storefront)
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

// 2. The NEW GET function (Retrieves orders for the Admin Dashboard)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' } // Shows newest orders first
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}