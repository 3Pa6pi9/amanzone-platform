import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Database Load Failed" }, { status: 500 });
  }
}

// POST: Add new product with Image
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const name = formData.get('productName') as string;
    const type = formData.get('type') as string;
    const value = parseFloat(formData.get('value') as string);

    if (!file) return NextResponse.json({ error: "No image" }, { status: 400 });

    // NOTE: Replace this dummy URL with your actual S3/Cloudinary upload logic later
    const uploadedUrl = "https://via.placeholder.com/300"; 

    const product = await prisma.product.create({
      data: {
        name: name || "New Product",
        type: type || "Steel",
        value: value || 0,
        imageUrl: uploadedUrl
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Server Crash" }, { status: 500 });
  }
}