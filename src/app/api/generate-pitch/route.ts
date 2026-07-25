import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { domain } = await req.json();

    // Pehle check karein ke Vercel par API Key set hai ya nahi
    if (!process.env.XAI_API_KEY) {
      return NextResponse.json({ error: "API Key missing in Vercel Environment Variables." }, { status: 500 });
    }

    // Grok (xAI) API ko call karein
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-beta", 
        messages: [
          {
            role: "system",
            content: "You are an expert SEO outreach specialist. Write a concise, highly personalized guest post pitch email. Do not use em dashes. Keep it under 150 words. Return the response strictly as a JSON object with 'subject' and 'body' keys."
          },
          {
            role: "user",
            content: `Write a guest post pitch email to the team at ${domain}. Suggest a topic relevant to their niche.`
          }
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();

    // Agar Grok API fail ho jaye
    if (!response.ok) {
      console.error("Grok API Error:", data);
      // Exact error message extract karein
      const errorMessage = data?.error?.message || data?.message || "Unknown Grok API error.";
      return NextResponse.json({ error: `Grok API Error: ${errorMessage}` }, { status: response.status });
    }

    // Agar sab sahi hai, toh response parse karein
    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      return NextResponse.json({ 
        success: true, 
        subject: parsed.subject, 
        body: parsed.body 
      });
    } else {
      return NextResponse.json({ error: "Grok returned an unexpected response format." }, { status: 500 });
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
