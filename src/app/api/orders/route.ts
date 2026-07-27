import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Website ki detail se price confirm karein (security ke liye)
    const site = await db.query.publisherSites.findFirst({
      where: eq(publisherSites.id, body.publisherSiteId),
    });

    if (!site) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    // Order database mein save karein
    const [newOrder] = await db.insert(orders).values({
      publisherSiteId: site.id,
      buyerEmail: body.buyerEmail,
      buyerName: body.buyerName,
      articleTopic: body.articleTopic,
      specialInstructions: body.specialInstructions || null,
      price: site.price,
      status: "pending_payment",
    }).returning();

    return NextResponse.json({ 
      success: true, 
      orderId: newOrder.id,
      message: "Order placed! Proceed to payment."
    });

  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
