import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { prospects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { prospectId, subject, content } = await req.json();

    // Database se prospect ki detail lein
    const prospect = await db.query.prospects.findFirst({
      where: eq(prospects.id, prospectId),
    });

    if (!prospect || !prospect.contactEmail) {
      return NextResponse.json({ error: "Prospect email not found" }, { status: 404 });
    }

    // Resend API ko call karein (Bina kisi package ke)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend ki default testing email
        from: "GuestPilot <onboarding@resend.dev>", 
        to: [prospect.contactEmail],
        subject: subject,
        html: content,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: 500 });
    }

  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
