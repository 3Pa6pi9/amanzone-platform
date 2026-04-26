import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import axios from "axios";

// Forces the route to be dynamic to avoid Vercel build errors
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { productIds, phone, city, subcity, residence, amount } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product IDs are required", { status: 400 });
    }

    // 1. Create the Order in your database first
    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        phone: phone,
        // Combining subcity and residence into the address field
        address: `Subcity: ${subcity}, Residence: ${residence}, City: ${city}`,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: { id: productId }
            }
          }))
        }
      }
    });

    // 2. Initialize Chapa Payment
    const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
    
    const chapaResponse = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: amount,
        currency: "ETB",
        phone_number: phone,
        tx_ref: `order_${order.id}`,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?success=1`,
        customization: {
          title: "AmanZone Order",
          description: `Payment for Order #${order.id}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // 3. Return the payment URL to the frontend
    return NextResponse.json({ url: chapaResponse.data.data.checkout_url });

  } catch (error) {
    console.error("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
