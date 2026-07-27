import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        publisher_site_id TEXT NOT NULL REFERENCES publisher_sites(id) ON DELETE CASCADE,
        buyer_email TEXT NOT NULL,
        buyer_name TEXT NOT NULL,
        article_topic TEXT NOT NULL,
        special_instructions TEXT,
        price INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending_payment',
        created_at INTEGER NOT NULL DEFAULT (unixepoch())
      );
    `);
    return NextResponse.json({ success: true, message: "Orders table created successfully!" });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
