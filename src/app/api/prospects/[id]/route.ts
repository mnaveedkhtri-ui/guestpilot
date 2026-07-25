import { NextResponse } from "next/server";
import { db } from "@/db";
import { prospects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth"; // Sahi import

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth(); // Naya tarika
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const id = parseInt(params.id);
    await db.delete(prospects).where(eq(prospects.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete prospect:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
