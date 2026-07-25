import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { prospects } from "@/db/schema";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.workspace?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaceId = session.workspace.id;

  try {
    const { niche } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ API Key missing." }, { status: 500 });
    }

    // 1. AI se websites ki list mangwate hain
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an SEO expert. Return a JSON array of 5 high-authority domains that accept guest posts in the given niche. Only return domains like 'example.com', without 'https://'." },
          { role: "user", content: `Find 5 websites in the "${niche}" niche.` }
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: "AI failed to find websites." }, { status: 500 });

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    // AI se string format mein aayega, usko array mein convert karein
    const domainsString = JSON.stringify(parsed).match(/\[(.*?)\]/)?.[0];
    const domainsArray: string[] = domainsString ? JSON.parse(domainsString) : [];

    if (domainsArray.length === 0) {
      return NextResponse.json({ error: "No websites found." }, { status: 404 });
    }

    // 2. Dhoondhi hui websites ko Database mein add karein
    for (const domain of domainsArray) {
      await db.insert(prospects).values({
        domain: domain,
        workspaceId: workspaceId,
        status: "new",
      });
    }

    return NextResponse.json({ success: true, count: domainsArray.length });

  } catch (error) {
    console.error("Auto prospect error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
