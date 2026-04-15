export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items, transactionId } = body as { amount: number, items: any[], transactionId: string };

    const order = await prisma.order.create({
      data: {
        totalAmount: amount,
        items: JSON.stringify(items), 
        status: "PENDING_VERIFICATION",
        transactionId: transactionId
      }
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load ledger" }, { status: 500 });
  }
}