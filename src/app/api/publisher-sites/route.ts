import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";

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
      status: "pending", // Admin approve karega
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving site:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
