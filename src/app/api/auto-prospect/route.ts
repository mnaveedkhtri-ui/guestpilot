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

    // 1. AI se websites aur unke standard emails mangwate hain
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: "You are an SEO expert. Return a JSON object with a key 'websites' containing an array of 5 objects. Each object must have a 'domain' (e.g., 'example.com') and a 'contactEmail' (e.g., 'info@example.com', 'editor@example.com', or 'contact@example.com'). Do not include 'https://'. Do not use em dashes." 
          },
          { role: "user", content: `Find 5 high authority websites in the "${niche}" niche that accept guest posts.` }
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: "AI failed to find websites." }, { status: 500 });

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    // Array extract karein
    const websitesArray = parsed.websites || [];

    if (websitesArray.length === 0) {
      return NextResponse.json({ error: "No websites found." }, { status: 404 });
    }

    // 2. Dhoondhi hui websites aur emails ko Database mein add karein
    for (const site of websitesArray) {
      // Agar AI email nahi de pata, toh default info@ laga dein
      const email = site.contactEmail || `info@${site.domain}`;
      
      await db.insert(prospects).values({
        domain: site.domain,
        contactEmail: email,
        workspaceId: workspaceId,
        status: "new",
      });
    }

    return NextResponse.json({ success: true, count: websitesArray.length });

  } catch (error) {
    console.error("Auto prospect error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
