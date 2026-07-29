import { useEffect, useRef, useState } from "react";
import kanuuAvatar from "../assets/images/kanuu-avatar.png";
import { askKanuu } from "../services/openrouterClient";
import { getWeatherContext } from "../services/weatherClient";

const WEATHER_KEYWORDS = ["weather", "temperature", "rain", "forecast", "climate", "hot outside", "cold outside"];

function isWeatherQuestion(text) {
  const lower = text.toLowerCase();
  return WEATHER_KEYWORDS.some((k) => lower.includes(k));
}

export default function Kanuu({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey! I'm Kanuu, Kushagra's AI assistant. Ask me anything about his projects, skills, experience, or how to get in touch." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setLoading(true);

    let weatherContext = null;
    if (isWeatherQuestion(text)) {
      weatherContext = await getWeatherContext();
    }

    const now = new Date();
    const liveContext = {
      currentDateTime: now.toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" }),
      weather: weatherContext,
    };

    try {
      const reply = await askKanuu(
        nextMessages.map((m) => ({ role: m.role, text: m.text })),
        liveContext
      );
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: err.message || "I'm having trouble connecting right now — try again in a moment, or reach Kushagra directly via the contact form." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={onOpen}
          title="Ask Kanuu"
          className="fixed bottom-7 right-7 z-[500] w-16 h-16 rounded-2xl flex items-center justify-center animate-glowPulse"
          style={{ background: "var(--ink-800)", border: "1px solid rgba(237,232,222,0.3)", overflow: "hidden" }}
        >
          <img src={kanuuAvatar} alt="Kanuu" className="w-full h-full object-cover grayscale" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-7 right-7 z-[999] w-[360px] max-w-[92vw] rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: "520px",
            maxHeight: "80vh",
            background: "var(--ink-900)",
            border: "1px solid rgba(237,232,222,0.25)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5"
            style={{ background: "var(--ink-800)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(237,232,222,0.3)" }}>
              <img src={kanuuAvatar} alt="Kanuu" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-sm text-cream-full">Kanuu</div>
              <div className="text-[11px] text-cream-dim opacity-50">Kushagra's AI Assistant</div>
            </div>
            <button onClick={onClose} className="text-cream-dim opacity-60 hover:opacity-100 text-lg leading-none">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] text-[13px] leading-[1.55] px-3.5 py-2.5 rounded-xl"
                  style={{
                    background: m.role === "user" ? "rgba(237,232,222,0.1)" : "var(--ink-700)",
                    color: "var(--cream)",
                    border: m.role === "user" ? "1px solid rgba(237,232,222,0.2)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 rounded-xl text-[13px] text-cream-dim opacity-50" style={{ background: "var(--ink-700)" }}>
                  Kanuu is typing…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Kanuu anything…"
              className="flex-1 rounded-lg px-3 py-2.5 text-[13px] outline-none"
              style={{ background: "var(--ink-700)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream)" }}
            />
            <button onClick={send} disabled={loading} className="btn-primary text-xs px-4 py-2">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
