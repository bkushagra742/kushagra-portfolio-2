// Direct client-side integration with OpenRouter (https://openrouter.ai) —
// a gateway to open-source models (Llama, Mistral, Gemma, etc.), including
// genuinely free models. No serverless proxy — same tradeoff as before:
// the API key and knowledge base are visible in the browser bundle.
//
// Setup:
//   1. Sign up at https://openrouter.ai (free, no card needed for :free models)
//   2. Create a key at https://openrouter.ai/keys
//   3. Put it in .env as VITE_OPENROUTER_API_KEY
//   4. Check https://openrouter.ai/models?max_price=0 for the current list
//      of free models — they rotate over time, so MODEL below may need
//      updating occasionally.

import { buildKnowledgeBaseText } from "../data/knowledgeLoader";

// Free models rotate/get deprecated on OpenRouter without much notice, so
// instead of hardcoding one, we try a short list in order and automatically
// fall back to the next if a model is unavailable (HTTP 404) or rate
// limited (HTTP 429). Check https://openrouter.ai/models?max_price=0 for
// the current live list if ALL of these ever stop working at once.
const MODEL_CANDIDATES = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

function buildLiveContextBlock(liveContext) {
  return `\n\n===== live_context =====\nCurrent date/time: ${liveContext?.currentDateTime || "unknown"}\nWeather: ${liveContext?.weather ? JSON.stringify(liveContext.weather) : "not requested for this message"}\n(Only use weather/time info above if the visitor's question actually needs it.)`;
}

/**
 * Sends the conversation to OpenRouter directly from the browser.
 * @param {{role: "user"|"assistant", text: string}[]} messages
 * @param {{currentDateTime?: string, weather?: object|null}} liveContext
 * @returns {Promise<string>} Kanuu's reply text
 */
export async function askKanuu(messages, liveContext) {
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_OPENROUTER_API_KEY. Add it to your .env file (see .env.example) and restart the dev server."
    );
  }

  const systemText = buildKnowledgeBaseText() + buildLiveContextBlock(liveContext);

  const chatMessages = [
    { role: "system", content: systemText },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    })),
  ];

  let lastError = null;

  for (const model of MODEL_CANDIDATES) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Kushagra Nexus - Kanuu",
        },
        body: JSON.stringify({
          model,
          messages: chatMessages,
          temperature: 0.6,
          max_tokens: 400,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        let detail = "";
        try {
          detail = JSON.parse(errBody)?.error?.message || "";
        } catch {
          detail = errBody.slice(0, 200);
        }
        console.error(`OpenRouter error on ${model}:`, res.status, detail);

        // Model-specific failures — try the next candidate instead of giving up.
        if (res.status === 404 || res.status === 429) {
          lastError = new Error(`(${model}) HTTP ${res.status}: ${detail}`);
          continue;
        }

        // Other errors (bad key, malformed request, etc.) won't be fixed by
        // trying a different model — fail immediately with the real reason.
        throw new Error(`Kanuu's AI service failed (HTTP ${res.status})${detail ? `: ${detail}` : ""}`);
      }

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;
      return reply || "Sorry, I couldn't come up with a response to that — try rephrasing?";
    } catch (err) {
      if (err.message?.startsWith("Kanuu's AI service failed")) throw err; // non-retryable, propagate
      lastError = err; // network error or similar — try next candidate
    }
  }

  throw new Error(
    `All free models are currently unavailable. Last error: ${lastError?.message || "unknown"}. Check https://openrouter.ai/models?max_price=0 for currently available free models.`
  );
}