import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, category, imageUrl } = body;

    // We map 'price' to 'value' and 'category' to 'type' for the database
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        value: Number(price),
        type: category,
        imageUrl: imageUrl
      }
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("DATABASE CRASH REASON:", error);
    return NextResponse.json({ error: "Database save failed" }, { status: 500 });
  }
}
