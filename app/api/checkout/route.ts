// VERCEL & RENDER PRODUCTION BYPASS - SINGLE DYNAMIC EXPORT
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. POST: Creates orders from the storefront
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items, transactionId, quantity, city, subcity, residence, phone, deliveryMethod } = body;

    const order = await prisma.order.create({
      data: {
        totalAmount: amount,
        items: JSON.stringify(items),
        transactionId: transactionId,
        status: 'PENDING_VERIFICATION',
        quantity: quantity,
        city: city,
        subcity: subcity,
        residence: residence,
        phoneNumber: phone,
        deliveryMethod: deliveryMethod
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}

// 2. GET: Retrieves orders for the Admin Dashboard
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}