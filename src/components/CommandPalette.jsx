import { useEffect, useState } from "react";

export default function CommandPalette({ open, onClose, onOpenKanuu }) {
  const [q, setQ] = useState("");

  const commands = [
    { label: "Go to Home", action: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Go to About", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Go to Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Go to Skills", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Go to Experience", action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Go to Certifications", action: () => document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Go to Contact", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Download Resume", action: () => { const a = document.createElement("a"); a.href = "/resume.png"; a.download = "resume.png"; a.click(); } },
    { label: "Ask Kanuu (AI Assistant)", action: () => onOpenKanuu() },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] rounded-[20px] overflow-hidden"
        style={{ background: "#141414", border: "1px solid rgba(237,232,222,0.25)", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-5 py-4 gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-cream-dim">⌘</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            className="flex-1 bg-transparent border-none outline-none text-cream-full text-[15px]"
          />
          <kbd className="text-[11px] text-cream-dim opacity-50 px-2 py-0.5 rounded-md" style={{ background: "var(--ink-800)", border: "1px solid rgba(255,255,255,0.08)" }}>
            ESC
          </kbd>
        </div>
        <div className="py-2">
          {filtered.map((c, i) => (
            <div
              key={i}
              onClick={() => {
                c.action();
                onClose();
              }}
              className="flex items-center gap-3.5 px-5 py-3 cursor-pointer hover:bg-white/5"
            >
              <span className="text-sm text-cream-dim opacity-80">{c.label}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-2.5 flex gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[11px] text-cream-dim opacity-40">↑↓ navigate</span>
          <span className="text-[11px] text-cream-dim opacity-40">↵ select</span>
          <span className="text-[11px] text-cream-dim opacity-40">ESC close</span>
        </div>
      </div>
    </div>
  );
}
