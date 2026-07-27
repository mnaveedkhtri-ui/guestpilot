import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";

// Buyers ke liye: Approved websites fetch karna
export async function GET() {
  try {
    const sites = await db.select().from(publisherSites).where(eq(publisherSites.status, "approved"));
    return NextResponse.json(sites);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sites" }, { status: 500 });
  }
}

// Sellers ke liye: Naya website submit karna
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    await db.insert(publisherSites).values({
      userId: session.user.id,
      domain: body.domain,
      niche: body.niche,
      dr: body.dr,
      traffic: body.traffic,
      price: body.price,
      linkType: body.linkType,
      contactEmail: body.contactEmail, // Naya field save hoga
      status: "pending", 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving site:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
