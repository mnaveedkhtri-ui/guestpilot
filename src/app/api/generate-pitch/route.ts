import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { domain } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "API Key missing in Vercel Environment Variables." }, { status: 500 });
    }

    const prompt = `You are an expert SEO outreach specialist. Write a concise, highly personalized guest post pitch email. Do not use em dashes. Keep it under 150 words. Return the response strictly as a JSON object with 'subject' and 'body' keys.\n\nWrite a guest post pitch email to the team at ${domain}. Suggest a topic relevant to their niche.`;

    // Groq API ko call karein (Llama 3 model use kar rahe hain jo free aur fast hai)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an expert SEO outreach specialist. Return the response strictly as a JSON object with 'subject' and 'body' keys." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Raw Error:", data);
      const errorMessage = JSON.stringify(data);
      return NextResponse.json({ error: `Groq API Response: ${errorMessage}` }, { status: response.status });
    }

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      
      return NextResponse.json({ 
        success: true, 
        subject: parsed.subject, 
        body: parsed.body 
      });
    } else {
      return NextResponse.json({ error: "Groq returned an unexpected response format." }, { status: 500 });
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
