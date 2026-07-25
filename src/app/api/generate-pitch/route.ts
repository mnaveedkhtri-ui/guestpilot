import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // 1. User ka current credit check karein
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user || user.credits <= 0) {
      return NextResponse.json({ error: "You are out of credits. Please upgrade to Pro." }, { status: 403 });
    }

    const { domain } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "API Key missing." }, { status: 500 });
    }

    // 2. Groq API call karein
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an expert SEO outreach specialist. Return the response strictly as a JSON object with 'subject' and 'body' keys. Do not use em dashes." },
          { role: "user", content: `Write a guest post pitch email to the team at ${domain}. Suggest a topic relevant to their niche.` }
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "AI failed to generate pitch." }, { status: 500 });
    }

    // 3. AI success hone par 1 Credit minus karein
    await db.update(users).set({
      credits: user.credits - 1
    }).where(eq(users.id, userId));

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    return NextResponse.json({ 
      success: true, 
      subject: parsed.subject, 
      body: parsed.body 
    });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
