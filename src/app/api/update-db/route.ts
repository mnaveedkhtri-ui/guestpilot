import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Publisher Sites table create karna
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
        created_at INTEGER NOT NULL DEFAULT (unixepoch())
      );
    `);
    return NextResponse.json({ success: true, message: "Publisher Sites table created successfully!" });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
