import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Contact Email column add karna
    await db.run(sql`ALTER TABLE publisher_sites ADD COLUMN contact_email TEXT;`);
    return NextResponse.json({ success: true, message: "Contact email column added!" });
  } catch (error: any) {
    if (error.message.includes("duplicate column name")) {
      return NextResponse.json({ success: true, message: "Column already exists." });
    }
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
