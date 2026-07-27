import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  // Sirf aap (Admin) isko dekh sakte hain
  if (session?.user?.email !== "naveedkhtri7@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const pendingSites = await db.select().from(publisherSites).where(eq(publisherSites.status, "pending"));
  return NextResponse.json(pendingSites);
}
