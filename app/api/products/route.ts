// VERCEL & RENDER PRODUCTION BYPASS
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // This automatically selects the exact columns currently in schema.prisma
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
    } catch (error) {
    // This line forces Vercel to print the exact reason it crashed!
    console.error("DATABASE CRASH REASON:", error); 
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, category, imageUrl } = body;

    const newProduct = await prisma.product.create({
  data: {
    name: name,
    value: Number(price),   // Tells Prisma to save the 'price' into the 'value' column
    type: category,         // Tells Prisma to save the 'category' into the 'type' column
    imageUrl: imageUrl
  }
});

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}