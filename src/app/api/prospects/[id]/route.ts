import { NextResponse } from "next/server";
import { db } from "@/db";
import { prospects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const prospectId = parseInt(id);
    
    await db.delete(prospects).where(eq(prospects.id, prospectId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete prospect:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
