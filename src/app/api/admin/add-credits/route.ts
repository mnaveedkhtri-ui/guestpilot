import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const email = searchParams.get("email");
  const creditsToAdd = parseInt(searchParams.get("credits") || "0");

  // 1. Secret Key check karein
  if (secret !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized! Wrong secret key." }, { status: 401 });
  }

  if (!email || !creditsToAdd) {
    return NextResponse.json({ error: "Email and credits amount are required." }, { status: 400 });
  }

  try {
    // 2. User dhoondein
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found with this email." }, { status: 404 });
    }

    // 3. Credits update karein
    const newCredits = user.credits + creditsToAdd;
    await db.update(users).set({ credits: newCredits }).where(eq(users.email, email));

    return NextResponse.json({ 
      success: true, 
      message: `Success! ${creditsToAdd} credits added to ${email}. Total credits: ${newCredits}` 
    });

  } catch (error) {
    console.error("Admin add credits error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
