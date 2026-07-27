import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.email !== "naveedkhtri7@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId, status } = await req.json();
  await db.update(publisherSites).set({ status }).where(eq(publisherSites.id, siteId));
  
  return NextResponse.json({ success: true });
}import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.email !== "naveedkhtri7@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { siteId, status } = await req.json();
  await db.update(publisherSites).set({ status }).where(eq(publisherSites.id, siteId));
  
  return NextResponse.json({ success: true });
}
