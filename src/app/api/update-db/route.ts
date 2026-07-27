import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // 1. Pehle Table ko Create karenge (agar pehle se nahi hai)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS publisher_sites (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        domain TEXT NOT NULL,
        niche TEXT NOT NULL,
        dr INTEGER NOT NULL,
        traffic INTEGER NOT NULL,
        price INTEGER NOT NULL,
        link_type TEXT NOT NULL DEFAULT 'Dofollow',
        status TEXT NOT NULL DEFAULT 'pending',
        contact_email TEXT,
        created_at INTEGER NOT NULL DEFAULT (unixepoch())
      );
    `);

    // 2. Agar table pehle se tha aur usme contact_email nahi tha, toh add karenge
    try {
      await db.run(sql`ALTER TABLE publisher_sites ADD COLUMN contact_email TEXT;`);
    } catch (e: any) {
      // Agar column pehle se ho toh error ignore karenge
    }

    return NextResponse.json({ success: true, message: "Table created/updated successfully with contact_email!" });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
