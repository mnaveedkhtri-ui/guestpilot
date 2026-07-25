import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Ye SQL query directly database mein credits column add karegi
    await db.run(sql`ALTER TABLE users ADD COLUMN credits INTEGER NOT NULL DEFAULT 10;`);
    return NextResponse.json({ success: true, message: "Credits column added successfully!" });
  } catch (error: any) {
    // Agar column pehle se mojood ho, toh ye error aayega
    if (error.message.includes("duplicate column name")) {
      return NextResponse.json({ success: true, message: "Credits column already exists." });
    }
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
