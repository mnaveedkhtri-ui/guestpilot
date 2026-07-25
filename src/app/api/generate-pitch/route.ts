import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { domain } = await req.json();

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json({ error: "API Key missing in Vercel Environment Variables." }, { status: 500 });
    }

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-2-latest",
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
        // response_format hata diya kyunke Grok isko support nahi kar raha tha
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Grok API Raw Error:", data);
      // Pura data string mein convert kar ke bhej do
      const errorMessage = JSON.stringify(data);
      return NextResponse.json({ error: `Grok API Response: ${errorMessage}` }, { status: response.status });
    }

    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message.content;
      
      // Grok kabhi kabhi markdown code block mein JSON bhejta hai, usko clean karein
      let cleanContent = content;
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.replace(/```json/g, "").replace(/```/g, "").trim();
      }

      try {
        const parsed = JSON.parse(cleanContent);
        return NextResponse.json({ 
          success: true, 
          subject: parsed.subject, 
          body: parsed.body 
        });
      } catch (parseError) {
        // Agar JSON parse na ho, toh simple text return kar dein
        return NextResponse.json({ 
          success: true, 
          subject: "Guest Post Proposal", 
          body: cleanContent 
        });
      }
    } else {
      return NextResponse.json({ error: "Grok returned an unexpected response format." }, { status: 500 });
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
