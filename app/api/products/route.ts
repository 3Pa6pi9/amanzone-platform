import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// CRITICAL: This forces Next.js to fetch fresh data every single second, killing the cache bug!
export const dynamic = 'force-dynamic';

// ==========================================
// 1. YOUR EXISTING GET ROUTE (For Inventory)
// ==========================================
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

// ==========================================
// 2. THE NEW POST ROUTE (For Adding Products)
// ==========================================
export async function POST(request: Request) {
  try {
    // We MUST parse this as formData, not JSON, because it contains a file
    const formData = await request.formData();
    
    // Extract the data sent from the frontend
    const file = formData.get('image') as File | null;
    const productName = formData.get('productName') as string;
    const type = formData.get('type') as string;
    const valueStr = formData.get('value') as string;
    const value = parseFloat(valueStr);

    // If no file was attached, reject the request
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // [NOTE: In a production app, you would upload the file to AWS S3, Cloudinary, etc., here]
    // For now, we simulate a saved image URL so Prisma doesn't crash
    const dummyImageUrl = "https://via.placeholder.com/150";

    // Save the new product to the database
    const newProduct = await prisma.product.create({
      data: {
        name: productName || "Unnamed Product",
        type: type || "Steel", 
        value: isNaN(value) ? 0 : value,    
        imageUrl: dummyImageUrl, 
      }
    });

    // Return the successful creation status
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.error("Backend Error adding product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}