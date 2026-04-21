// VERCEL PRODUCTION BYPASS - SINGLE DYNAMIC EXPORT
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 1. Catch the new fields from the frontend
    const { amount, items, transactionId, quantity, city, subcity, residence, phone } = body;

    const order = await prisma.order.create({
      data: {
        totalAmount: amount,
        items: JSON.stringify(items),
        transactionId: transactionId,
        status: 'PENDING_VERIFICATION',
        // 2. Save them to the database
        quantity: quantity,
        city: city,
        subcity: subcity,
        residence: residence,
        phoneNumber: phone
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}