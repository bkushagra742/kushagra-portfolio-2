// Serverless function (Vercel-style). Deploys automatically if this repo is
// connected to Vercel — just set GEMINI_API_KEY in your Vercel project's
// Environment Variables (Project Settings → Environment Variables).
//
// For Netlify instead: move this file to netlify/functions/kanuu-chat.js,
// change the export to `exports.handler = async (event) => {...}`, and
// parse `JSON.parse(event.body)` instead of `req.body`. See README.md.

import { buildKanuuSystemPrompt } from "../src/data/knowledgeBase.js";

const GEMINI_MODEL = "gemini-2.0-flash";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing GEMINI_API_KEY" });
  }

  try {
    const { messages, liveContext } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const contextBlock = `\n\nLIVE CONTEXT (use only if the visitor's question actually needs it):\nCurrent date/time: ${liveContext?.currentDateTime || "unknown"}\nWeather: ${liveContext?.weather ? JSON.stringify(liveContext.weather) : "not requested for this message"}`;

    const systemInstruction = {
      role: "system",
      parts: [{ text: buildKanuuSystemPrompt() + contextBlock }],
    };

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction,
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ error: "Kanuu's AI service failed to respond" });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Sorry, I couldn't come up with a response to that — try rephrasing?";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("kanuu-chat error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
