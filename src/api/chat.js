import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `
You are a movie mood assistant.
Always return response in strict JSON format:

{
  "mood": "",
  "recommended_genres": [],
  "message": ""
}

Only return JSON. No extra text.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const aiText = completion.choices[0]?.message?.content;

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: "AI request failed" });
  }
}