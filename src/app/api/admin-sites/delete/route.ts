import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await auth();
  // Sirf aap (Admin) delete kar sakte hain
  if (session?.user?.email !== "naveedkhtri7@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 });
  }

  try {
    // Domain ke hisaab se delete karein
    await db.delete(publisherSites).where(eq(publisherSites.domain, domain));
    return NextResponse.json({ success: true, message: `${domain} deleted successfully!` });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
