import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { domain } = await req.json();

    // Grok (xAI) API ko call karein
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-beta", // Grok ka latest model
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

    if (response.ok && data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      return NextResponse.json({ success: true, subject: parsed.subject, body: parsed.body });
    } else {
      console.error("Grok API Error:", data);
      // Exact error show karne ke liye
      return NextResponse.json({ error: data.error?.message || "Grok API failed to generate pitch." }, { status: 500 });
    }

  } catch (error) {
    console.error("Generate pitch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
